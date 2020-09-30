import logging
import types
import random

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import COMMASPACE
from django_q.tasks import async_task, result
from django.conf import settings

import boto3

from oneinterviewparjour.core.models import (
    User,
    Program,
    Problem,
    ProgramHistory
)

from oneinterviewparjour.core.models import (
    BuyingHash
)

from oneinterviewparjour.stripe.models import Session

from oneinterviewparjour.mail_scheduler.helpers import (
    generate_template_mail,
    generate_payment_token,
    _convert_to_strings,
    hash_token
)

class AmazonSender(object):
    #https://kb.databricks.com/_static/notebooks/notebooks/send-email-aws.html
    client = None

    def __init__(self):
        self.aws_key = settings.AWS_PUBLIC_KEY
        self.aws_secret = settings.AWS_SECRET_KEY
        self.aws_region_name = settings.AWS_REGION_NAME
        self.problem_metadata = dict()

    def send_email(self, sender, to_addresses, subject, html):
        client = self.__get_client()
        return client.send_email(
            Source=sender,
            Destination={
                'ToAddresses': to_addresses
            },
            Message={
                'Subject': {
                    'Data': subject,
                    'Charset': 'UTF-8'
                },
                'Body': {
                    'Html': {
                        'Data': html,
                        'Charset': 'UTF-8'
                    }
                }
            }
        )

    def __get_client(self):
        if not self.client:
            self.client = boto3.client(
                'ses',
                aws_access_key_id=self.aws_key,
                aws_secret_access_key=self.aws_secret,
                region_name=self.aws_region_name
            )

        return self.client

    def run(self, problem_metadata):
        self.problem_metadata = problem_metadata
        # generate payment_gateway_link, put it into self.problem_metadata
        # and register its hash into the `BuyingHash` model
        payment_token = generate_payment_token()
        self.problem_metadata["payment_gateway_link"] = f"{settings.FRONT_BASE_PATH}/payment?mail={self.problem_metadata['mail']}&token={payment_token}"
        if self.problem_metadata["company_name"] == "1interviewparjour":
            self.problem_metadata["company_message"] = "Cette interview est une création originale"
        else:
            self.problem_metadata["company_message"] = "Ce probleme est inspiré d'une interview donnée par"

        mail_content = generate_template_mail(self.problem_metadata, self.problem_metadata['pro'])
        self.send_email(
            "h3llb0t@1interviewparjour.com",
            [self.problem_metadata["mail"]],
            f"[1INTERVIEWPARJOUR] {self.problem_metadata['exercise_title']}",
            mail_content
        )
        # Insertion into `ProgramHistory`
        ProgramHistory.objects.create(
            problem_id=self.problem_metadata["problem_id"],
            user_id=self.problem_metadata["user_id"],
        )
        # Update in `Program` : choose randomly a problem_id among those
        # which are not already in `ProgramHistory`
        history = set(ProgramHistory.objects.filter(user_id=self.problem_metadata["user_id"]).values_list('problem_id', flat=True))
        problem_set = set(Problem.objects.all().values_list('id', flat=True))
        choice = problem_set - history
        if len(choice) == 0:  # in this case, the user finished the complete list of available problems. For now, let's choose a random one inside the problem set.
            next_problem_id = random.choice(tuple(problem_set))
        else:
            next_problem_id = random.choice(tuple(problem_set - history))
        Program.objects.filter(id=self.problem_metadata["program_id"]).update(
            problem_id=next_problem_id
        )
        # ...And insertion into `BuyingHash` in order to
        # keep the buying link in database for this particular problem.
        BuyingHash.objects.create(
            problem_id=self.problem_metadata["problem_id"],
            user_id=self.problem_metadata["user_id"],
            hashed_token=hash_token('sha256', payment_token)
        )


def exceptionnal(payload):
    """
    After a product is bought, the solution for the mail whose
    the user clicked on is immediately sent either if the product
    is a unitary solution or the monthly subscription.

    When this function is called, the problem is alway in 'PRO' mode.
    """
    mail = payload["mail"]
    problem_id = payload["problem_id"]
    session_id = payload["session_id"]
    future_pro_user = payload["future_pro_user"]

    if Problem.objects.filter(id=problem_id).exists():
        problem = Problem.objects.get(id=problem_id)
        problem_metadata = {
            "exercise_title": problem.title,
            "company_name": problem.company.name,
            "exercise_body": problem.exercise,
            "exercise_bootcode": problem.bootcode,
            "exercise_correction": problem.correction,
            "exercise_difficulty": problem.difficulty
        }
        if problem.company.name == "1interviewparjour":
            problem_metadata["company_message"] = "Cette interview est une création originale"
        else:
            problem_metadata["company_message"] = "Ce probleme est inspiré d'une interview donnée par"

        mail_content = generate_template_mail(problem_metadata, True)
        ses_sender = AmazonSender()
        ses_sender.send_email(
            "h3llb0t@1interviewparjour.com",
            [mail],
            f"[1INTERVIEWPARJOUR] {problem_metadata['exercise_title']}",
            mail_content
        )
        return {
            "status": True,
            "session_id": session_id,
            "mail": mail,
            "future_pro_user": future_pro_user
        }

    else:
        return {
            "status": False,
            "error": "problem_id does not exist."
        }


def exceptionnal_hook(result):
    """
    hook for the `exceptionnal` function above (`exceptionnal` is called
    in a djangoQ async Task so we must have a hook to handle the result).
    """
    if result["status"]:
        # do the update for the session_id
        Session.objects.create(stripe_session_id=result["session_id"])
        if result["future_pro_user"]:
            # Change the status of the user for the future interview
            user = User.objects.get(mail=result["mail"])
            user.pro = True
            user.save()
            # TODO : trigger observability hook
            print("TODO : [SUCCESS][FUTURE PRO USER] should trigger observability hook")
        else:
            # TODO : trigger observability hook
            print("TODO : [SUCCESS][UNIT BUY] should trigger observability hook")
    else:
        # TODO : trigger observability hook
        print("TODO : [ERROR] should trigger observability hook")


def scheduled(args):
    """
    For the daily mails delivery.

    - args[0]: contains an integer corresponding to the hour of a program in the Paris Timezone

    This is the main function for the sending process of the mails

    1) Fetch all the programs for the given hour.
    2) In a djangoQ task :
        2.1) Build the `problem_metadata` dict() passed as a parameter to `generate_template_mail`
        2.2) Fill in the mail
        2.3) Send it using AWS boto3
        2.4) Update the models accordingly : Insertion into `ProgramHistory`, update in `Program``
             and insertion into `BuyingHash`

    """
    logging.info("send_mail.main function called with params : {}", args)
    programs = Program.objects.filter(hour=args)
    scheduled_program = []
    for program in programs:
        scheduled_program.append({
            "program_id": program.id,
            "user_id": program.user.id,
            "mail": program.user.mail,
            "pro": program.user.pro,
            "problem_id": program.problem.id,
            "exercise_title": program.problem.title,
            "company_name": program.problem.company.name,
            "exercise_body": program.problem.exercise,
            "exercise_bootcode": program.problem.bootcode,
            "exercise_correction": program.problem.correction,
            "exercise_difficulty": program.problem.difficulty
        })

    ses_sender = AmazonSender()
    for program in scheduled_program:
        #async_task(
        #    'ses_sender.run', program, hook='oneinterviewparjour.observability.mailing_metrics.expose_sent_mail'
        #) # the hook is a function in the observability packages which generates Prometheus metrics
        ses_sender.run(program)

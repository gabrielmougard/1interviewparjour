import logging
import types
import random

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

from oneinterviewparjour.mail_scheduler.ses import AmazonSender


def hook_run(result):
    """
    hook for the `exceptionnal` function above (`exceptionnal` is called
    in a djangoQ async Task so we must have a hook to handle the result).
    """
    if result["status"]:
        # do the update for the session_id
        if "session_id" in result.keys():
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
            print("TODO : [SUCCESS][UNIT BUY] should trigger observability hook")
    else:
        # TODO : trigger observability hook
        print("TODO : [ERROR] should trigger observability hook")


def run(scheduled_data, ses_client, exceptionnal_data, preview, mail_preview):
    """
    scheduled_data (object) :
        {
            "problem": <ProblemModel>,  # MANDATORY
            "program_id": program.id,
            "user_id": program.user.id,
            "mail": program.user.mail,
            "pro": program.user.pro,
        }

    ses_client (AmazonSender object ref) : an instanciated AWS SES client.

    exceptionnal_data (object):
        {
            "mail": <STRING>,
            "problem_id": <STRING>,
            "session_id": <STRING>,
            "future_pro_user": <BOOLEAN>,
        }
    """
    def process_exceptionnal(ses_client, exceptionnal_data, preview=False, mail_preview=None):
        mail = exceptionnal_data["mail"]
        problem_id = exceptionnal_data["problem_id"]
        if not preview:
            session_id = exceptionnal_data["session_id"]
            future_pro_user = exceptionnal_data["future_pro_user"]
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

            mail_content = [generate_template_mail(problem_metadata, True)] if not preview else [generate_template_mail(problem_metadata, True), generate_template_mail(problem_metadata, False)]

            for idx, m in enumerate(mail_content):
                ses_client.send_email(
                    "h3llb0t@1interviewparjour.com",
                    [mail if not preview else mail_preview],
                    f"[1INTERVIEWPARJOUR]{'[PREVIEW]' if preview else ''}{'[PRO]' if idx == 0 else ''} {problem_metadata['exercise_title']}",
                    m
                )

            if preview:
                return {
                    "status": True,
                    "mail": mail
                }
            else:
                return {
                    "status": True,
                    "session_id": session_id,
                    "mail": mail_preview,
                    "future_pro_user": future_pro_user
                }
        else:
            return {
                "status": False,
                "error": "problem_id does not exist."
            }


    if scheduled_data is not None:
        # generate payment_gateway_link, put it into scheduled_data
        # and register its hash into the `BuyingHash` model
        payment_token = generate_payment_token()
        scheduled_data["payment_gateway_link"] = f"{settings.FRONT_BASE_PATH}/payment?mail={scheduled_data['mail']}&token={payment_token}"
        if scheduled_data["problem"].company.name == "1interviewparjour":
            scheduled_data["company_message"] = "Cette interview est une création originale"
        else:
            scheduled_data["company_message"] = "Ce probleme est inspiré d'une interview donnée par"

        mail_content = generate_template_mail(scheduled_data, scheduled_data['pro'])
        ses_client.send_email(
            "h3llb0t@1interviewparjour.com",
            [scheduled_data["mail"]],
            f"[1INTERVIEWPARJOUR]{'[PRO]' if scheduled_data['pro'] else ''} {scheduled_data['problem'].exercise_title}",
            mail_content
        )
        # Insertion into `ProgramHistory`
        ProgramHistory.objects.create(
            problem_id=scheduled_data["problem"].id,
            user_id=scheduled_data["user_id"],
        )
        # Update in `Program` : choose randomly a problem_id among those
        # which are not already in `ProgramHistory`
        history = set(ProgramHistory.objects.filter(user_id=scheduled_data["user_id"]).values_list('problem_id', flat=True))
        problem_set = set(Problem.objects.filter(active=True).values_list('id', flat=True))
        choice = problem_set - history
        if len(choice) == 0:  # in this case, the user finished the complete list of available problems. For now, let's choose a random one inside the problem set.
            next_problem_id = random.choice(tuple(problem_set))
        else:
            next_problem_id = random.choice(tuple(problem_set - history))
        Program.objects.filter(id=scheduled_data["program_id"]).update(
            problem_id=next_problem_id
        )
        # ...And insertion into `BuyingHash` in order to
        # keep the buying link in database for this particular problem.
        if not scheduled_data['pro']:
            BuyingHash.objects.create(
                problem_id=scheduled_data["problem"].id,
                user_id=scheduled_data["user_id"],
                hashed_token=hash_token('sha256', payment_token)
            )
        return {
            "status": True,
            "mail": mail
        }
    else:
        # There are two kind of exceptionnal events :
        #   - When a problem is added in admin and we should send a preview (both in pro and normal mode)
        #   - When a problem is bought as a unit part or when a user subscribe (we send only the pro mode here)
        if preview:
            return process_exceptionnal(ses_client, exceptionnal_data, preview=True, mail_preview=mail_preview)

        else:
            return process_exceptionnal(ses_client, exceptionnal_data)


def send(hour=None, exceptionnal_data=None, preview=False, mail_preview=None):
    """
    Merge of `scheduled` and `exceptionnal`

    - When `hour` (integer between 0 and 23) is set, it usually comes from the scheduled calls for sending mail.
    `exceptionnal` is ignored so as `preview`

    - If `hour` is None, it means that `exceptionnal` is not None. We take into account the `preview`
    parameter

    - If `preview` is True (when a problem is just added in django admin, a preview is sent at
    `mail_preview` to check the problem in a mail environment). `mail_preview`must not be None is
    this case
    """
    def send_with_async(scheduled_data, ses_sender, exceptionnal_data=None, preview=False, mail_preview=None):
        if settings.ENV == "prod":
            async_task(
                'ses_sender.run',
                (scheduled_data, ses_sender, exceptionnal_data, preview, mail_preview),
                hook='oneinterviewparjour.mail_scheduler.send_mail.hook_run'
            ) # the hook is a function which produce observability metrics for Prometheus
        else:
            hook_run(run(scheduled_data, ses_sender, exceptionnal_data, preview, mail_preview))

    if hour is None and exceptionnal_data is None:
        raise ValueError("hour is None so exceptionnal must not be None.")
    if hour is None and exceptionnal_data is not None and preview and mail_preview is None:
        raise ValueError("preview is True so mail_preview must not be None.")

    ses_sender = AmazonSender()
    if hour is not None:
        programs = Program.objects.filter(hour=hour)
        scheduled_program = []
        for program in programs:
            scheduled_program.append({
                "program_id": program.id,
                "user_id": program.user.id,
                "mail": program.user.mail,
                "pro": program.user.pro,
                "problem": program.problem
            })

        for scheduled_data in scheduled_program:
            send_with_async(scheduled_data, ses_sender)
    else:
        send_with_async(None, ses_sender, exceptionnal_data, preview, mail_preview)

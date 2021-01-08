import sys
from enum import Enum

from django.conf import settings
from django.template.loader import get_template
from django_q.tasks import async_task

from oneinterviewparjour.core.models import PlanningEvent, Problem, ProblemHistory, BuyingHash, Topic
from oneinterviewparjour.mail_scheduler.helpers import (
    generate_gateway_token,
    _to_HTML_code,
    hash_token
)
from oneinterviewparjour.observability.ops import produce_mailing_metric, produce_mailing_metric_dev
from oneinterviewparjour.mail_scheduler.hook_code import MailingHookCode
from oneinterviewparjour.mail_scheduler.ses import AmazonSender

class BaseMailingProcess:
    def __init__(self):
        pass


    def generate_template_mail(
        self,
        problem,
        pro,
        custom_company_message=None,
        payment_gateway_link=None,
        planning_gateway_link=None):
        """
        1) Use a mardown to html generator for the `problem.exercise`

        2) if pro is False, we will fill mail-not-pro.html and we will take the
        first 12 lines of code of `problem.exercise`

        3) Format the `problem.bootcode` and the (shortened or not
        according to the state of the `pro` variable)
        `problem.correction`

        4) According to `pro`, we fill either "mail-pro.html" or "mail-not-pro.html"
        with `problem.title`, `problem.company`, the converted to HTML
        `problem.exercise` markdown syntax, the hilighted `problem.bootcode`,
        and `problem.correction`.

        if the `problem.company` is {name: "1interviewparjour", logo: "..."} change
        "Ce probleme est inspire d'une interview donnee par" by "Ce probleme est une creation originale de"

        5) return return the formatted template as a string.
        """
        # 1)
        exercise_body_list = problem.exercise.split("\n")
        exercise_body_formatted = ""
        for line in exercise_body_list:
            if len(line) == 0 or len(line.replace(" ", "")) == 0:
                exercise_body_formatted += "<p style='line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;'> </p>"
            else:
                exercise_body_formatted += "<p style='line-height: 1.2; word-break: break-word; font-size: 14px; mso-line-height-alt: 17px; margin: 0;'><span style='font-size: 14px;'>"+line+"</span></p>"
            exercise_body_formatted += "\n"
        # 2)
        exercise_correction_formatted = ""
        if not pro:
            exercise_correction_formatted = "\n".join(problem.correction.split("\n")[:12])
        else:
            exercise_correction_formatted = problem.correction
        # 3)
        exercise_bootcode_formatted = _to_HTML_code(problem.bootcode, problem.language, {}, 'default', False, 'padding:.2em .6em;')
        exercise_correction_formatted = _to_HTML_code(exercise_correction_formatted, problem.language, {}, 'default', False, 'padding:.2em .6em;')
        # 4)
        if pro:
            ctx_pro = {
                'company_message': custom_company_message,
                'company_name': problem.company.name,
                'exercise_title': problem.title,
                'exercise_body': exercise_body_formatted,
                'exercise_bootcode': exercise_bootcode_formatted,
                'exercise_correction': exercise_correction_formatted,
                'exercise_explanation': problem.explanation,
                'planning_gateway_link': planning_gateway_link
            }
            htmlpro = get_template('mail-pro.html')
            return htmlpro.render(ctx_pro)

        ctx = {
            'company_message': custom_company_message,
            'company_name': problem.company.name,
            'exercise_title': problem.title,
            'exercise_body': exercise_body_formatted,
            'exercise_bootcode': exercise_bootcode_formatted,
            'exercise_correction': exercise_correction_formatted,
            'payment_gateway_link': payment_gateway_link,
            'planning_gateway_link': planning_gateway_link
        }
        htmlnotpro = get_template('mail-not-pro.html')
        return htmlnotpro.render(ctx)


    def send(self, sender, to_adresses, subject, html):
        """
        Send a mail using AWS SES
        """
        ses = AmazonSender()
        return ses.send_email(sender, to_adresses, subject, html)


    def __update_program_history(self, user, problem):
        """
        Update the ProblemHistory of a user.
        """
        ProblemHistory.objects.create(
            problem_id=problem.id,
            user_id=user.id,
        )


    def __update_buying_hash(self, user, problem, gateway_token):
        """
        Update the BuyingHash for a user's problem.
        """
        if not user.pro:
            BuyingHash.objects.create(
                problem_id=problem.id,
                user_id=user.id,
                hashed_token=hash_token('sha256', gateway_token)
            )


    def send_and_update(self, content_data):
        """
        This is called inside the async_task :
        1)  self.send()
        2)  if the messageId is present in the response of self.send(), do self.__update_program_history
            and self.__update_buying_hash
        3)  return {"status_codes" : []MailingHookCode, "data": [...]} to pass data
            to the hook (self.__produce_mailing_metric) observability/ which will build the metrics
            in Prometheus format and call the Prometheus client to persist them.
        """
        try:
            user = content_data["user"]
            problem = content_data["problem"]
            gateway_token = content_data["gateway_token"]
            is_pro_user = content_data["is_pro_user"]
            sending_type = content_data["sending_type"]
            dest_mail = user.mail
            response = self.send(
                "h3llb0t@1interviewparjour.com",
                [dest_mail],
                f"[1INTERVIEWPARJOUR]{'[PRO]' if is_pro_user else ''} {problem.title}",
                content_data["problem_html"]
            )

            if response.get('MessageId'):
                try:
                    self.__update_program_history(user, problem)
                    try:
                        self.__update_buying_hash(user, problem, gateway_token)

                        if sending_type == "unit":
                            return {
                                "sending_type": sending_type,
                                "status_code": MailingHookCode.SENDING_SUCCESS,
                                "data": {
                                    "stripe_session": content_data["stripe_session"],
                                    "future_pro_user": content_data["future_pro_user"],
                                    "user": user,
                                    "problem": problem
                                }
                            }
                        return {
                            "sending_type": sending_type,
                            "status_code": MailingHookCode.SENDING_SUCCESS,
                            "data": {"event": content_data["event"], "problem": problem}
                        }
                    except:
                        print("A database error occured while updating BuyingHash models.")
                        return {
                            "sending_type": sending_type,
                            "status_code": MailingHookCode.UPDATE_BUYING_HASH_ERROR,
                            "data": {}
                        }
                except:
                    print("A database error occured while updating ProblemHistory models.")
                    return {
                        "sending_type": sending_type,
                        "status_code": MailingHookCode.UPDATE_PROGRAM_HISTORY_ERROR,
                        "data": {}
                    }
            else:
                print("A sending error occured with the AWS SES sending process.")
                return {
                    "sending_type": sending_type,
                    "status_code": MailingHookCode.AWS_SES_SENDING_ERROR,
                    "data": {}
                }
        except:
            print("A sending error occured with the AWS SES sending process.")
            return {
                "sending_type": sending_type,
                "status_code": MailingHookCode.AWS_SES_SENDING_ERROR,
                "data": {}
            }


class BatchMailingProcess(BaseMailingProcess):
    def __init__(self):
        """
        The BatchMailingProcess handle the core logic
        for sending batches of mails to end users. (process called in the scheduler)

        It takes up to two arguments :
        - `day` : integer belonging to [0, 6]
        which indicate the day of the events to be processed.

        - `hour` : integer belonging to [0, 23]
        which indicate the hour of the events to be processed.

        - `minute` : integer belonging to [0, 59]
        which indicate the minute of the events to be processed.
        (ex : An event starts at '15:30' so if `minute` 28 or 29
        we will round it to 30 and find the appropriate events)
        """
        BaseMailingProcess.__init__(self)
        self.exec_day = None
        self.exec_hour = None
        self.exec_minute = None


    def __get_event_batches(self):
        """
        Get the PlanningEvent models to be processed

        If exec_minute is not completely 0 or 30 due to scheduling bugs
        (the two possible values that we may have for our PlanningEvent models in DB)
        we need to call a rounding operation to get the events

        n hour         ___________
        |
        |(here) ------------------   (i.e1 n:25 ==> we round to n + 1/2. i.e2 n:2 ==> we round to n)
        |
        (n + 1/2) hour ___________
        |
        |
        |
        (n + 1) hour   ___________
        """
        def round_event_time(day, hour, minute):
            if minute < 30:
                minute = 0
            elif minute >= 30 and minute < 45:
                minute = 30
            else:
                minute = 0
                hour += 1
                if hour == 24:
                    hour = 0
                    day += 1
                    if day == 7:
                        day = 0
            return day, hour, minute

        round_day, round_hour, round_minute = round_event_time(
            self.exec_day,
            self.exec_hour,
            self.exec_minute
        )
        event_batches = PlanningEvent.objects\
            .filter(day=round_day)\
            .filter(time=f"{str(round_hour)}:{str(round_minute)}")\

        return event_batches


    def __get_optimal_problem_by_event(self, event):
        """
        An event contains data about the desired language, topics and difficulty
        on a problem. These 3 parameters, put in order of importance, are used
        to make a choice : which problem will be sent for a given event.

        - the event `language` parameter has to be exact. If there is no other choices,
        take an already passed problem in the ProblemHistory models.

        - the event `topics` have to match the maximum amount of `topics` in a Problem model.
        A Problem model has up to 3 topic fields  : 'topic1', 'topic2' and 'topic3'.

        Therefore, the `matching_score` is an integer which can range from 0 to 3.
        Of course, the ideal case is 3.

        - the event `difficulty` have to match the Problem difficulty. We also have a matching system
        here : We have 5 levels of difficulty ==> easy, medium, advanced, hard, extrem.

        For example if the desired level is 'advanced', the 'matching_score' is given as follow :

         ________________________________________________________________________
        |    EASY    |    MEDIUM    |    ADVANCED    |    HARD    |    EXTREM    |
        |____________|______________|________________|____________|______________|
        |     2      |      1       |       0        |      1     |      2       |
        |____________|______________|________________|____________|______________|

        The goal is that the matching score has to be the smallest possible. But
        what if no 'Problem' fullfill the 'topics' conditions in 'advanced' difficulty ?
        Well we use a random operation to shrink the grid as follow :

         _______________________________________________________
        |    EASY    |    MEDIUM    |    HARD    |    EXTREM    |
        |____________|______________|____________|______________|
        |     1      |      0       |      1     |      2       |
        |____________|______________|____________|______________|

        or

         _______________________________________________________
        |    EASY    |    MEDIUM    |    HARD    |    EXTREM    |
        |____________|______________|____________|______________|
        |     2      |      1       |      0     |      1       |
        |____________|______________|____________|______________|

        Then we iterate the operation again...

        If the list shinks down to be empty (there is really no choices. It should be rare though),
        We take a random one among the ones available with the given `matching_score` for the `topics`.
        """

        def get_topics_matching_score(problem, event_topics):
            """
            Very simple ranking function for the topics described above.
            """
            problem_topics = [
                str(problem.topic1),
                str(problem.topic2),
                str(problem.topic3)
            ]
            passed_topics = [] # needed to avoid duplicate topics (by default topic1, 2 and 3 are all the same but we don't want a score of 3 for such a case)
            score = 0
            for topic in problem_topics:
                if topic in event_topics and topic not in passed_topics:
                    score += 1
                    passed_topics.append(topic)
            return score


        def get_difficulty_matching_score(problem, event_difficulty):
            """
            Very simple ranking function for the difficulty described above.
            """
            supported_difficulties = {diff[0]: idx for idx, diff in enumerate(Problem.DIFFICULTY)}
            return abs(supported_difficulties[problem.difficulty] - supported_difficulties[event_difficulty])


        # 1) Language filtering (mandatory)
        by_language = Problem.objects.filter(language=event.language).filter(active=True)
        history = ProblemHistory.objects.filter(user=event.user).values_list('problem', flat=True) # get the passed interview for a given user.
        available_problem = by_language.exclude(id__in=history)

        if len(available_problem) == 0:
            # in this case, the user finished the complete list of available problems.
            # For now, let's keep history.
            available_problem = by_language

        event_topics = event.topics.split(",")
        event_difficulty = event.difficulty

        # First ranking part : rank the problem by topics
        topics_ranking = []
        for problem in available_problem:
            topics_ranking.append({
                "problem": problem,
                "topics_matching_score": get_topics_matching_score(problem, event_topics)
            })
        # The first entries have the best score (higher is better)
        topics_ranking.sort(key=lambda entry: entry["topics_matching_score"], reverse=True)

        # Second ranking part : rank the problem by difficulty
        difficulty_ranking = []
        for problem in available_problem:
            difficulty_ranking.append({
                "problem": problem,
                "difficulty_matching_score": get_difficulty_matching_score(problem, event_difficulty)
            })
        # The first entries have the best score (lower is better)
        difficulty_ranking.sort(key=lambda entry: entry["difficulty_matching_score"], reverse=False)

        best_score = -sys.maxsize
        best_problem_pair = {}
        weight_identical = 4 # If two problem are identical, we add 4 to the global score
        weight_topic = 3 # the weight for the topic score
        weight_diffculty = 2 # the weight for the difficulty score (slightly less than topic)
        for i in range(len(available_problem)):
            score = (topics_ranking[i]["topics_matching_score"] * weight_topic) - (difficulty_ranking[i]["difficulty_matching_score"] * weight_diffculty)
            if topics_ranking[i]["problem"] == difficulty_ranking[i]["problem"]:
                score += weight_identical
            if score > best_score:
                best_score = score
                best_problem_pair = {"by_topic": topics_ranking[i]["problem"], "by_difficulty": difficulty_ranking[i]["problem"]}

        # Now we have to make a choice between the two problem in best_problem_pair.
        # For now, we give priority to the topics (as difficulty can be very relative from a person to another)
        return best_problem_pair["by_topic"]


    def run(self, day=None, hour=None, minute=None):
        """
        Run the batch mailing process.
        """
        try:
            self.exec_day = int(day)
            self.exec_hour = int(hour)
            self.exec_minute = int(minute)
        except TypeError:
            print("One of the arguments is not an integer.")
            raise

        #1) Get all the events which need to be processed
        events = self.__get_event_batches()

        #2) Get the optimal problem for each event.
        event_problem_list = [] # [{"event": PlanningEvent, "problem": Problem, "gateway_token": <string>}, ...]
        for event in events:
            entry = {"event": event, "gateway_token": generate_gateway_token() }
            entry["problem"] = self.__get_optimal_problem_by_event(event)
            event_problem_list.append(entry)

        #3) Generate each html content for a given problem and update `event_problem_list`
        # in order to be [{"event": PlanningEvent, "problem": Problem, "html": <string>}, ...]
        backslash_string = "Ce problème est inspiré d'une interview donnée par"
        for entry in event_problem_list:
            entry["html"] = super().generate_template_mail(
                entry["problem"],
                entry["event"].user.pro,
                custom_company_message=f"{'Cette interview est une création originale' if entry['problem'].company.name == '1interviewparjour' else backslash_string}",
                payment_gateway_link=f"{settings.FRONT_BASE_PATH}/payment?mail={entry['event'].user.mail}&token={entry['gateway_token']}",
                planning_gateway_link=f"{settings.FRONT_BASE_PATH}/planning?mail={entry['event'].user.mail}&token={entry['gateway_token']}"
            )

        #4) Sending process. Since the network is the bottleneck here, async_task could be useful.
        for entry in event_problem_list:
            if settings.ENV == "prod":
                async_task(
                    super().send_and_update,
                    {
                        "event": entry["event"],
                        "user": entry["event"].user,
                        "problem": entry["problem"],
                        "problem_html": entry["html"],
                        "gateway_token": entry["gateway_token"],
                        "is_pro_user": entry["event"].user.pro,
                        "sending_type": "batch"
                    },
                    hook=produce_mailing_metric
                )
            else:
                produce_mailing_metric_dev(super().send_and_update(
                    {
                        "event": entry["event"],
                        "user": entry["event"].user,
                        "problem": entry["problem"],
                        "problem_html": entry["html"],
                        "gateway_token": entry["gateway_token"],
                        "is_pro_user": entry["event"].user.pro,
                        "sending_type": "batch"
                    })
                )


class UnitMailingProcess(BaseMailingProcess):
    def __init__(self):
        """
        The UnitMailingProcess handle the core logic
        for sending one mail given a problem.
        It's when a user decide to go for the PRO
        offer (a unit mail with the solution is directly sent)
        """
        BaseMailingProcess.__init__(self)
        self.user = None
        self.unit_problem = None
        self.stripe_session = None
        self.future_pro_user = None


    def run(self, user, problem, stripe_session, future_pro_user):
        """
        Run the unit mailing process.
        """
        self.user = user
        self.unit_problem = problem
        self.stripe_session = stripe_session
        self.future_pro_user = future_pro_user

        gateway_token = generate_gateway_token()
        backslash_string = "Ce problème est inspiré d'une interview donnée par"
        custom_company_message = f"{'Cette interview est une création originale' if self.unit_problem.company.name == '1interviewparjour' else backslash_string}"
        mail_content = super().generate_template_mail(
            self.unit_problem,
            True, # A unit mail is always sent after a payment is successful
            custom_company_message=custom_company_message,
            payment_gateway_link=f"{settings.FRONT_BASE_PATH}/payment?mail={user.mail}&token={gateway_token}",
            planning_gateway_link=f"{settings.FRONT_BASE_PATH}/planning?mail={user.mail}&token={gateway_token}"
        )
        if settings.ENV =="prod":
            async_task(
                super().send_and_update,
                {
                    "user": user,
                    "problem": self.unit_problem,
                    "problem_html": mail_content,
                    "gateway_token": gateway_token,
                    "is_pro_user": True,
                    "future_pro_user": self.future_pro_user,
                    "sending_type": "unit",
                    "stripe_session": self.stripe_session
                },
                hook=produce_mailing_metric
            )
        else:
            produce_mailing_metric_dev(super().send_and_update(
                {
                    "user": user,
                    "problem": self.unit_problem,
                    "problem_html": mail_content,
                    "gateway_token": gateway_token,
                    "is_pro_user": True,
                    "future_pro_user": self.future_pro_user,
                    "sending_type": "unit",
                    "stripe_session": self.stripe_session
                })
            )


class PreviewMailingProcess(BaseMailingProcess):
    def __init__(self):
        """
        The PreviewMailingProcess handle the core logic
        for sending one mail for a preview given a problem.
        It's used when doing email previews when adding/updating
        a Problem model in the admin page.
        """
        BaseMailingProcess.__init__(self)
        self.preview_problem = None
        self.mail_preview = None


    def run(self, problem, mail_preview):
        """
        Run the unit mailing process.
        """
        self.unit_problem = problem
        self.mail_preview = mail_preview

        backslash_string = "Ce problème est inspiré d'une interview donnée par"
        custom_company_message = f"{'Cette interview est une création originale' if self.unit_problem.company.name == '1interviewparjour' else backslash_string}"
        mail_contents = [
            super().generate_template_mail(
                self.unit_problem,
                False,
                custom_company_message=custom_company_message,
                payment_gateway_link="#", # We don't need the links for a preview
                planning_gateway_link="#"
            ),
            super().generate_template_mail(
                self.unit_problem,
                True,
                custom_company_message=custom_company_message,
                payment_gateway_link="#", # We don't need the links for a preview
                planning_gateway_link="#"
            ),
        ]

        for idx, html in enumerate(mail_contents):
            super().send(
                "h3llb0t@1interviewparjour.com",
                [self.mail_preview],
                f"[1INTERVIEWPARJOUR][PREVIEW]{'[PRO]' if idx == 0 else ''} {self.unit_problem.title}",
                html
            )


def MailingFactory(mailing_process):
    mailing_processes = {
        "batch": BatchMailingProcess,
        "unit": UnitMailingProcess,
        "preview": PreviewMailingProcess
    }
    if not mailing_process or not mailing_processes.get(mailing_process):
        raise ValueError(
            f"The mailing process {mailing_process} is not part of {list(mailing_processes.keys())}"
        )
    return mailing_processes[mailing_process]()

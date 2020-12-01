import logging

import arrow

from oneinterviewparjour.core.base import BaseCommandWithLogger
from oneinterviewparjour.core.models import Problem
from oneinterviewparjour.mail_scheduler.engine import MailingFactory

class Command(BaseCommandWithLogger):
    def add_arguments(self, parser):
        parser.add_argument('problem_title', nargs='+', type=str)

    def handle(self, *args, **kwargs):
        logging.info("Starting schedule test at %s", arrow.utcnow())
        now = arrow.utcnow()
        mailing_instance = MailingFactory("preview")
        for problem_title in kwargs["problem_title"]:
            try:
                problem = Problem.objects.get(title=problem_title)
                mailing_instance.run(problem, problem.mail_preview)
            except Problem.DoesNotExist:
                print(f"The problem with the title : {problem_title} does not exist.")

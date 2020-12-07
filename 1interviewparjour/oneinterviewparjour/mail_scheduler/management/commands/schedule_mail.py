import logging
from itertools import product
from random import shuffle
import arrow

from django_q.models import Schedule

from oneinterviewparjour import settings
from oneinterviewparjour.core.base import BaseCommandWithLogger
from oneinterviewparjour.core.commands import schedule
from oneinterviewparjour.core.helpers import MINUTES
from oneinterviewparjour.mail_scheduler.engine import MailingFactory


@schedule(every= 30 * MINUTES, starting='10:00:00') # 10am in UTC is noon in France timezone
class Command(BaseCommandWithLogger):
    def handle(self, *args, **kwargs):
        logging.info("Starting schedule test at %s", arrow.utcnow())
        now = arrow.utcnow()
        mailing_instance = MailingFactory("batch")
        mailing_instance.run(day=now.weekday(), hour=(now.hour + 1), minute=now.minute)

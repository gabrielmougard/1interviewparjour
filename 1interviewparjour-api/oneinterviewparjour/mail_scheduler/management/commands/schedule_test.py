import logging
from itertools import product
from random import shuffle
import arrow

from django_q.models import Schedule

from oneinterviewparjour import settings
from oneinterviewparjour.core.base import BaseCommandWithLogger
from oneinterviewparjour.core.commands import schedule
from oneinterviewparjour.core.helpers import MINUTES


@schedule(every= 1 * MINUTES, starting='10:00:00') # 10am in UTC is noon in France timezone
class Command(BaseCommandWithLogger):
    def handle(self, *args, **kwargs):
        logging.info("Starting schedule test at %s", arrow.utcnow())
        Schedule.objects.update_or_create(
            name=schedule_name,
            defaults={
                'func': 'oneinterviewparjour.mail_scheduler.send_mail.main',
                'args': arrow.utcnow().hour + 2, # hour in France timezone
                'schedule_type': Schedule.ONCE,
                'next_run': str(arrow.utcnow()),
            }
        )

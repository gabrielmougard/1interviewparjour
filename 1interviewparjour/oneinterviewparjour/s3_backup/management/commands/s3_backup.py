import logging
import arrow

from django.core import management

from oneinterviewparjour import settings
from oneinterviewparjour.core.base import BaseCommandWithLogger
from oneinterviewparjour.core.commands import schedule
from oneinterviewparjour.core.helpers import DAYS

@schedule(every= 1 * DAYS, starting='10:00:00') # 10am in UTC is noon in France timezone
class Command(BaseCommandWithLogger):
    def handle(self, *args, **kwargs):
        logging.info("[%s] Starting database backup to S3...", arrow.utcnow())
        management.call_command('dbbackup')

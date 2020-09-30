import logging

import arrow

from oneinterviewparjour.core.base import BaseCommandWithLogger
from oneinterviewparjour.mail_scheduler.send_mail import send

class Command(BaseCommandWithLogger):
    def handle(self, *args, **kwargs):
        logging.info("Starting schedule test at %s", arrow.utcnow())
        send(hour=arrow.utcnow().hour + 2)

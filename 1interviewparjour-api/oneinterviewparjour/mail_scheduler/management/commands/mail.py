import logging

import arrow

from oneinterviewparjour.core.base import BaseCommandWithLogger
from oneinterviewparjour.mail_scheduler.send_mail import main

class Command(BaseCommandWithLogger):
    def handle(self, *args, **kwargs):
        logging.info("Starting schedule test at %s", arrow.utcnow())
        main(arrow.utcnow().hour + 2)

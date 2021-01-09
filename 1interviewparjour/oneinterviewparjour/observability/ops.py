import sys
import logging

from oneinterviewparjour.core.models import User, ProblemHistory
from oneinterviewparjour.stripe.models import Session
from oneinterviewparjour.mail_scheduler.hook_code import MailingHookCode
from oneinterviewparjour.observability.metrics import mailing_counter


def fetch_user_conversion():
    total = User.objects.count()
    pro = User.objects.filter(pro=True).count()
    return pro, total - pro

def fetch_mailing_sent():
    sent_problems = ProblemHistory.objects.all()
    by_batch = sent_problems.filter(sent_mailing_type="batch").count()
    by_unit = sent_problems.filter(sent_mailing_type="unit").count()
    return by_batch, by_unit

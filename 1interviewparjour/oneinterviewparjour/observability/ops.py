import sys
import logging

from oneinterviewparjour.core.models import User
from oneinterviewparjour.stripe.models import Session
from oneinterviewparjour.mail_scheduler.hook_code import MailingHookCode
from oneinterviewparjour.observability.metrics import mailing_counter

def produce_mailing_metric(task):
    """
    Post-mailing ops
    """
    result = task.result
    if result["status_code"] == MailingHookCode.SENDING_SUCCESS:
        if result["data"].get("stripe_session"):
            # do the update for the session_id
            Session.objects.create(stripe_session_id=result["data"]["stripe_session"])
            if result["data"]["future_pro_user"]:
                # Change the status of the user for the future interview
                user = result["data"]["user"]
                user.pro = True
                user.save()
                mailing_counter.labels('unit').inc()
                sys.stdout.write("[SUCCESS][FUTURE PRO USER]")
        elif result["data"].get("event"):
            mailing_counter.labels('batch').inc()
            sys.stdout.write("[SUCCESS][BATCH]")
        else:
            sys.stdout.write("[UNKNOWN_OPS] unknown post-mailing operation.")
    else:
        sys.stdout.write("[ERROR] status_code %s", result['status_code'].value)


def produce_mailing_metric_dev(result):
    """
    Post-mailing ops (dev mode)
    """
    if result["status_code"] == MailingHookCode.SENDING_SUCCESS:
        if result["data"].get("stripe_session"):
            # do the update for the session_id
            Session.objects.create(stripe_session_id=result["data"]["stripe_session"])
            if result["data"]["future_pro_user"]:
                # Change the status of the user for the future interview
                user = result["data"]["user"]
                user.pro = True
                user.save()
                mailing_counter.labels('unit').inc()
                sys.stdout.write("[SUCCESS][FUTURE PRO USER]")
            else:
                # TODO : trigger Prometheus client to send a metric
                print("TODO : [SUCCESS][UNIT]")
        elif result["data"].get("event"):
            mailing_counter.labels('batch').inc()
            sys.stdout.write("[SUCCESS][BATCH]")
        else:
            sys.stdout.write("[UNKNOWN_OPS] unknown post-mailing operation.")
    else:
        sys.stdout.write("[ERROR] status_code %s", result['status_code'].value)


def fetch_user_conversion():
    total = User.objects.count()
    pro = User.objects.filter(pro=True).count()
    return pro, total - pro

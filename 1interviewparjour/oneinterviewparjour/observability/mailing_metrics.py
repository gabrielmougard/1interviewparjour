from oneinterviewparjour.stripe.models import Session
from oneinterviewparjour.mail_scheduler.hook_code import MailingHookCode


def expose_sent_mail(task):
    """
    Here we expose the metrics when a mail is successfully sent to a customer
    """
    result = task.result
    print(f"Observability : {result}")


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
                # TODO : trigger Prometheus client to send a metric
                print("TODO : [SUCCESS][FUTURE PRO USER]")
        elif result["data"].get("event"):
            # TODO : trigger Prometheus client to send a metric about the event
            print("TODO : [SUCCESS][BATCH]")
        else:
            # TODO : trigger Prometheus client to send a metric
            print("TODO : [UNKNOWN_OPS] unknown post-mailing operation.")
    else:
        # TODO : trigger Prometheus client to send a metric
        print(f"TODO : [ERROR] status_code {result['status_code'].value}")


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
                # TODO : trigger Prometheus client to send a metric
                print("TODO : [SUCCESS][UNIT][FUTURE PRO USER]")
            else:
                # TODO : trigger Prometheus client to send a metric
                print("TODO : [SUCCESS][UNIT]")
        elif result["data"].get("event"):
            # TODO : trigger Prometheus client to send a metric about the event
            print("TODO : [SUCCESS][BATCH]")
        else:
            # TODO : trigger Prometheus client to send a metric
            print("TODO : [UNKNOWN_OPS] unknown post-mailing operation.")
    else:
        # TODO : trigger Prometheus client to send a metric
        print(f"TODO : [ERROR] status_code {result['status_code'].value}")

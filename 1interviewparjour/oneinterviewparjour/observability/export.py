from prometheus_client import generate_latest

from oneinterviewparjour.observability.metrics import registry, pro_user_gauge, not_pro_user_gauge, mailing_gauge
from oneinterviewparjour.observability.ops import fetch_user_conversion, fetch_mailing_sent


def export_metrics():
    """
    Export the content of the collector. This function is called in the view
    to be fetched by the Prometheus server.
    """
    # Update users' conversion metrics
    pro_users, not_pro_users = fetch_user_conversion()
    pro_user_gauge.set(pro_users)
    not_pro_user_gauge.set(not_pro_users)

    # Update mailing's metrics
    by_batch, by_unit = fetch_mailing_sent()
    mailing_gauge.labels("batch").set(by_batch)
    mailing_gauge.labels("unit").set(by_unit)

    return generate_latest(registry)
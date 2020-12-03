from prometheus_client import generate_latest

from oneinterviewparjour.observability.metrics import registry, pro_user_gauge, not_pro_user_gauge
from oneinterviewparjour.observability.ops import fetch_user_conversion


def export_metrics():
    """
    Export the content of the collector. This function is called in the view
    to be fetched by the Prometheus server.
    """
    # Update users' conversion metrics
    pro_users, not_pro_users = fetch_user_conversion()
    pro_user_gauge.set(pro_users)
    not_pro_user_gauge.set(not_pro_users)

    return generate_latest(registry)
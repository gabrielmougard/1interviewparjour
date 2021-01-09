from prometheus_client import CollectorRegistry, Gauge, Counter


registry = CollectorRegistry()

#### Specific to mailing ####
mailing_counter = Counter(
    'mail_sent',
    'The number of mails sent to users',
    ['sending_type'], # 'batch' or 'unit'
    registry=registry
)

#### Specific to server traffic ####
http_request_counter = Counter(
    'http_request',
    'The number of http requests',
    ['method', 'endpoint'],
    registry=registry
)

def observe_endpoint(method="GET", endpoint=None):
    """
    Decorator for observing API endpoints.
    """
    def wrapper(view_func):
        def wrapped(request, *args, **kwargs):
            http_request_counter.labels(method, endpoint).inc()
            return view_func(request, *args, **kwargs)
        return wrapped
    return wrapper

#### Specific to user conversion ####
pro_user_gauge = Gauge(
    'pro_user',
    'The number of pro users',
    registry=registry
)

not_pro_user_gauge = Gauge(
    'not_pro_user',
    'The number of regular users',
    registry=registry
)

#### Specific to mailing ####
mailing_gauge = Gauge(
    'mailing_rate',
    'The number of mail sent',
    ['sending_type'],
    registry=registry
)

#### Specific to django models operations ####
model_inserts_gauge = Gauge(
    'model_inserts_total',
    'Number of insert operations by model',
    ['model'],
    registry=registry
)

model_updates_gauge = Counter(
    'model_updates_total',
    'Number of update operations by model',
    ['model'],
    registry=registry
)

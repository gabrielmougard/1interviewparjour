from django.urls import include, path

from oneinterviewparjour.api.v1.signup.signup import signup
from oneinterviewparjour.api.v1.identity.identity_check import check
from oneinterviewparjour.api.v1.languages.supported_languages import supported_languages
from oneinterviewparjour.api.v1.interviews.interview_metadata import (
    interview_topics,
    interview_difficulties
)
from oneinterviewparjour.api.v1.planning.planning import fetch_planning, save_planning
from oneinterviewparjour.api.v1.stripe.stripe import (
    stripe_config,
    create_checkout_session,
    create_checkout_session_from_lp,
    success_product_buying,
    cancel_product_buying
)
from oneinterviewparjour.api.v1.observability.expose_prometheus_metrics import expose_prometheus_metrics
from oneinterviewparjour.api.v1.tracking.tracking import (
    landing_page_home,
    landing_page_pro,
    landing_page_example,
    landing_page_method,
    landing_page_introduction
)


urlpatterns = [
    # Signup related
    path('signup', signup, name="signup"),
    # Interview languages related
    path('languages/supported_languages', supported_languages, name="supported_languages"),
    # Interview topics related
    path('interviews/interview_topics', interview_topics, name="interview_topics"),
    path('interviews/interview_difficulties', interview_difficulties, name="interview_difficulties"),
    # Planning related
    path('planning/fetch_planning', fetch_planning, name="fetch_planning"),
    path('planning/save_planning', save_planning, name="save_planning"),
    # Stripe related
    path('stripe/config', stripe_config),
    path('stripe/create-checkout-session', create_checkout_session),
    path('stripe/create-checkout-session-from-lp', create_checkout_session_from_lp),
    path('stripe/success', success_product_buying),
    path('stripe/cancelled', cancel_product_buying),
    # Identity related
    path('identity/identity_check', check, name="identity_check"),
    # Frontend traffic related
    path('tracking/landing_page/home', landing_page_home, name="landing_page_home"),
    path('tracking/landing_page/pro', landing_page_pro, name="landing_page_pro"),
    path('tracking/landing_page/example', landing_page_example, name="landing_page_example"),
    path('tracking/landing_page/method', landing_page_method, name="landing_page_method"),
    path('tracking/landing_page/introduction', landing_page_introduction, name="landing_page_introduction"),
    # Observability related
    path('observability/metrics', expose_prometheus_metrics, name="expose_prometheus_metrics")
]

from django.urls import (path, re_path)

from . import views

urlpatterns = [
    path('config', views.stripe_config),
    re_path(r'^create-checkout-session$', views.create_checkout_session),
    path('success', views.success_product_buying),
    path('cancelled', views.cancel_product_buying),
]
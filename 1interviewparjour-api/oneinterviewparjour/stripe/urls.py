from django.urls import (path, re_path)

from . import views

urlpatterns = [
    path('', views.HomePageView.as_view(), name='home'),
    path('config', views.stripe_config),
    re_path(r'^create-checkout-session$', views.create_checkout_session),
    path('success/', views.SuccessView.as_view()),
    path('cancelled/', views.CancelledView.as_view()),
]
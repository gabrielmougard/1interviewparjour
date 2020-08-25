from django.urls import include, path

from one_interviewparjour.api.v1.views.signup import signup

urlpatterns = [
    path('signup/', signup, name="signup")
]

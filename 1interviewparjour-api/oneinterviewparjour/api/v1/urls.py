from django.urls import include, path

from oneinterviewparjour.api.v1.views.signup import signup

urlpatterns = [
    path('signup/', signup, name="signup")
]

from django.urls import include, path, re_path

from oneinterviewparjour.api.v1.views.signup import signup
from oneinterviewparjour.api.v1.views.identity_check import check

urlpatterns = [
    path('signup/', signup, name="signup"),
    re_path(r'^identity_check$', check, name="identity_check")
]

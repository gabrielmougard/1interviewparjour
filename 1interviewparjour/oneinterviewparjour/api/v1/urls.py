from django.urls import include, path, re_path

from oneinterviewparjour.api.v1.views.signup import signup
from oneinterviewparjour.api.v1.views.identity_check import check
from oneinterviewparjour.api.v1.views.supported_languages import supported_languages

urlpatterns = [
    path('signup/', signup, name="signup"),
    path('supported_languages/', supported_languages, name="supported_languages"),
    re_path(r'^identity_check$', check, name="identity_check")
]

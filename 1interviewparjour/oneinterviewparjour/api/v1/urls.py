from django.urls import include, path, re_path

from oneinterviewparjour.api.v1.views.signup import signup
from oneinterviewparjour.api.v1.views.identity_check import check
from oneinterviewparjour.api.v1.views.supported_languages import supported_languages
from oneinterviewparjour.api.v1.views.interview_metadata import interview_topics, interview_difficulties
from oneinterviewparjour.api.v1.views.planning import fetch_planning, save_planning

urlpatterns = [
    path('signup/', signup, name="signup"),
    path('supported_languages/', supported_languages, name="supported_languages"),
    path('interview_topics/', interview_topics, name="interview_topics"),
    path('interview_difficulties/', interview_difficulties, name="interview_difficulties"),
    path('planning', fetch_planning, name="fetch_planning"),
    path('save_planning', save_planning, name="save_planning"),
    re_path(r'^identity_check$', check, name="identity_check")
]

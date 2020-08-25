from django.urls import include, path

urlpatterns = [
    path('v1/', include('one_interviewparjour.api.v1.urls'))
]

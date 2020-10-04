from django.urls import include, path

urlpatterns = [
    path('v1/', include('oneinterviewparjour.api.v1.urls'))
]

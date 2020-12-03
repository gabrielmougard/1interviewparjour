# Expose all the Prometheus metrics of 1interviewparjour in this view...
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from prometheus_client import CONTENT_TYPE_LATEST

from oneinterviewparjour.observability.export import export_metrics


@csrf_exempt
def expose_prometheus_metrics(request):
    response = HttpResponse(content_type=CONTENT_TYPE_LATEST)
    response.write(export_metrics())
    return response

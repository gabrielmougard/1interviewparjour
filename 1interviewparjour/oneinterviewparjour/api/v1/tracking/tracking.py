from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from oneinterviewparjour.observability.metrics import observe_endpoint


@observe_endpoint(method="GET", endpoint="tracking/landing_page")
@csrf_exempt
def landing_page(request):
    """
    Do nothing except counting the number of visitors
    that we have on the landing page.
    """
    return HttpResponse(status=200)

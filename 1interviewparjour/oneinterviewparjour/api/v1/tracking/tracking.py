from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from oneinterviewparjour.observability.metrics import observe_endpoint


@csrf_exempt
@observe_endpoint(method="GET", endpoint="tracking/landing_page/home")
def landing_page_home(request):
    """
    Do nothing except counting the number of visitors
    that we have on the root landing page.
    """
    return HttpResponse(status=200)


@csrf_exempt
@observe_endpoint(method="GET", endpoint="tracking/landing_page/introduction")
def landing_page_introduction(request):
    """
    Do nothing except counting the number of visitors
    that we have on the /introduction landing page.
    """
    return HttpResponse(status=200)


@csrf_exempt
@observe_endpoint(method="GET", endpoint="tracking/landing_page/pro")
def landing_page_pro(request):
    """
    Do nothing except counting the number of visitors
    that we have on the /pro landing page.
    """
    return HttpResponse(status=200)


@csrf_exempt
@observe_endpoint(method="GET", endpoint="tracking/landing_page/method")
def landing_page_method(request):
    """
    Do nothing except counting the number of visitors
    that we have on the /method landing page.
    """
    return HttpResponse(status=200)


@csrf_exempt
@observe_endpoint(method="GET", endpoint="tracking/landing_page/example")
def landing_page_example(request):
    """
    Do nothing except counting the number of visitors
    that we have on the /example landing page.
    """
    return HttpResponse(status=200)

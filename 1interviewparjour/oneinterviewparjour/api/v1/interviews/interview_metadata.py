from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from oneinterviewparjour.core.models import Problem, Topic
from oneinterviewparjour.observability.metrics import observe_endpoint


@observe_endpoint(method="GET", endpoint="interviews/interview_topics")
@csrf_exempt
def interview_topics(request):
    """
    Find all the available topics for our interviews
    """
    return JsonResponse({'data': sorted(list(Topic.objects.values_list('topic', flat=True)))})


@observe_endpoint(method="GET", endpoint="interviews/interview_difficulties")
@csrf_exempt
def interview_difficulties(request):
    """
    Find all the level of difficulty that we have for our interviews
    """
    return JsonResponse({'data': [diff[0] for diff in Problem.DIFFICULTY]})
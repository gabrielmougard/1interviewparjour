from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from oneinterviewparjour.core.models import BuyingHash
from oneinterviewparjour.mail_scheduler.helpers import (
    hash_token
)

@csrf_exempt
def check(request):
    """
    Check the token in the mail and redirect to the right payment gateway
    """
    mail = request.GET['mail']
    token = request.GET['token']

    # iterate over all the BuyingHash object associated with the mail and check which one
    # match with the token, then we can send the problem_id if we find it. Else an error msg.

    bhs = BuyingHash.objects.filter(user__mail=mail).filter(hashed_token=hash_token('sha256', token))
    if len(bhs) == 0:
        return JsonResponse({'success': False, 'message': 'Could not retrieve the problem'})
    problem = bhs[0].problem
    return JsonResponse(
        {
            'success': True,
            'data': {
                "problem_id": problem.id,
                "problem_title": problem.title,
                "token": token
            }
        }
    )

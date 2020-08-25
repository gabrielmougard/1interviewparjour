import json

from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from one_interviewparjour.core.models import (
    User,
    Program
)


@csrf_exempt
def signup(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    mail = body["mail"]

    # register the user
    user, created = User.objects.get_or_create(
        mail=mail,
        pro=False,
        inscription_timestamp=datetime.utcnow()
    )

    if not created:
        return JsonResponse({'created': False, 'message': 'User already exists.'})


    # For now the program is each day at 5pm

    program, created = Program.objects.get_or_create(
        hour=17, # defacto program hour for now
        user_id=user.id,
        problem_id=1
    )

    if not created:
        return JsonResponse({'created': False, 'message': 'Program already exists.'})

    return JsonResponse({'created': True, 'message': 'User has been successfully created.'})

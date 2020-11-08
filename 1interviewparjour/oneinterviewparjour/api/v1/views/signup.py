import json

from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from oneinterviewparjour.core.models import (
    User,
    Program
)


@csrf_exempt
def signup(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    mail = body["mail"]
    training_languages = ",".join(body["languages"])

    # register the user
    try:
        exist = User.objects.get(mail=mail)
        return JsonResponse({'created': False, 'message': 'User already exists.'})
    except User.DoesNotExist:
        user = User.objects.create(
            mail=mail,
            training_languages=training_languages,
            pro=False,
            inscription_timestamp=datetime.utcnow()
        )

        # For now the program is each day at 5pm
        program, created = Program.objects.get_or_create(
            hour=17, # defacto program hour for now
            user_id=user.id,
            problem_id=1 # TODO : choose a random id among the ones availables.
        )
        return JsonResponse({'created': True, 'message': 'User has been successfully created.'})

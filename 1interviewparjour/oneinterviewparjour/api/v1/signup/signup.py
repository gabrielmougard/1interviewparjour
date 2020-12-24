import json
import sys

from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from oneinterviewparjour.core.models import (
    User,
    PlanningEvent
)
from oneinterviewparjour.observability.metrics import observe_endpoint


def generate_initial_planning(user):
    """
    We generate the initial planning for a user.
    By default, it's one interview per day starting at 5pm.
    If the user's training_languages field have multiple languages,
    we schedule each of them equally in the week
    """
    t_languages = user.training_languages.split(",")
    t_languages_count = [{"lang": lang, "count": 0} for lang in t_languages]
    least_idx = 0
    least_count = sys.maxsize

    for day in range(7):
        # get the least used language
        chosen_language = min(t_languages_count, key=lambda elt: elt["count"])["lang"]

        newEvent = PlanningEvent(
            user=user,
            title=f"Interview {chosen_language}",
            day=day,
            time="17:00",
            language=chosen_language,
            difficulty="medium",
            topics="Aléatoire"
        )
        newEvent.save()

        # increment the count
        for lang in t_languages_count:
            if lang["lang"] == chosen_language:
                lang["count"] += 1
                break

@csrf_exempt
@observe_endpoint(method="POST", endpoint="signup")
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

        # create one EventPlanning models on each day
        generate_initial_planning(user)

        return JsonResponse({'created': True, 'message': 'User has been successfully created.'})

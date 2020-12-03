import json
import dateutil.parser
from datetime import datetime, timedelta

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from django.core import serializers

from oneinterviewparjour.core.models import User, PlanningEvent
from oneinterviewparjour.api.v1.signup.signup import generate_initial_planning
from oneinterviewparjour.observability.metrics import observe_endpoint


def format_planning_data(planning):
    formatted_planning_data = []
    now = datetime.now()
    for event in planning:
        formatted_event = {}
        formatted_event["title"] = event["title"]
        formatted_event["language"] = event["language"]
        formatted_event["difficulty"] = event["difficulty"]
        formatted_event["topics"] = event["topics"].split(",")
        # format the starting date (set the good weekday, month , year , hour, minute)
        # However, second, microsecond and tzinfo are set to 0...
        dayDiff = event["day"] - now.weekday()
        event_ISO_datetime = now + timedelta(days=dayDiff)
        event_hour = int(event["time"].split(":")[0])
        event_minute = int(event["time"].split(":")[1])
        formatted_event["startStr"] = event_ISO_datetime.replace(hour=event_hour, minute=event_minute, second=0, microsecond=0).isoformat()

        formatted_planning_data.append(formatted_event)

    return formatted_planning_data


@observe_endpoint(method="POST", endpoint="planning/save_planning")
@csrf_exempt
def save_planning(request):
    """
    Save the state of the weekly user's planning.
    """

    body_unicode = request.body.decode("utf-8")
    body = json.loads(body_unicode)
    mail = body["mail"]
    planning = body["planning"]

    try:
        # 1) get the associated user
        user = User.objects.get(mail=mail)

        # 2) transaction : delete the old ones then add new PlanningEvents
        with transaction.atomic():
            # remove
            PlanningEvent.objects.filter(user=user).delete()
            # add
            for event in planning:
                start_date = dateutil.parser.parse(event["start"])
                newEvent = PlanningEvent(
                    user=user,
                    title=event["title"],
                    day=start_date.weekday(),
                    time=str(start_date.hour) + ":" +str(start_date.minute),
                    language=event["language"],
                    difficulty=event["difficulty"],
                    topics=",".join(event["topics"]),
                )
                newEvent.save()
            return JsonResponse({"success": True})
    except User.DoesNotExist:
        return JsonResponse(
            {"success": False, "message": f"L'utilisateur {mail} n'existe pas."}
        )


@observe_endpoint(method="GET", endpoint="planning/fetch_planning")
@csrf_exempt
def fetch_planning(request):
    """
    Fetch a planning given a user mail.
    """
    mail = request.GET["mail"]

    try:
        user = User.objects.get(mail=mail)
        planning = [
            event["fields"]
            for event in json.loads(serializers.serialize("json", list(PlanningEvent.objects.filter(user=user))))
        ]
        # format planning data
        formatted_planning_data = format_planning_data(planning)
        if len(formatted_planning_data) == 0:
            generate_initial_planning(user)
            fetch_planning(request)

        return JsonResponse(
            {"success": True, "data": formatted_planning_data}
        )
    except User.DoesNotExist:
        return JsonResponse(
            {"success": False, "message": f"L'utilisateur {mail} n'existe pas."}
        )

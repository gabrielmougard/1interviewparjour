import math

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from oneinterviewparjour.core.models import SupportedLanguage, Problem


@csrf_exempt
def supported_languages(request):
    """
    Find the supported languages, their descriptions and the associated problem count.
    """
    def round_count_for_ui(count):
        power = math.floor(math.log(count, 10))
        if power == 0:
            return str(count)
        if power == 1: # between 10 and 99 pbs for a same language (reasonable)
            return str(math.ceil(count/10)*10) + "+"
        elif power == 2: # between 100 and 999 pbs for a same language (we could eventually get there)
            return str(math.ceil(count/100)*100) + "+"
        else: # more than 1000 for a same language (we will have to wait to get there ...)
            return str(math.ceil(count/1000)) + "K"


    languages_desc = list(SupportedLanguage.objects.values())
    res = []
    for lang in languages_desc:
        res.append(
            {
                'language': lang['language'],
                'description': lang['description'],
                'pbs_count': round_count_for_ui(sum([pb_lang['language'] == lang['language'] for pb_lang in Problem.objects.values('language')]))
            }
        )
    return JsonResponse({'data': res})

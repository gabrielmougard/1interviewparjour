from django.conf import settings
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django_q.tasks import async_task, result

import stripe
from stripe.error import InvalidRequestError

from oneinterviewparjour.core.models import Problem
from oneinterviewparjour.stripe.models import Price, Session


@csrf_exempt
def stripe_config(request):
    if request.method == 'GET':
        if settings.STRIPE_LIVE_MODE:
            stripe_config = {'success': True, 'publicKey': settings.STRIPE_LIVE_PUBLIC_KEY}
        else:
            stripe_config = {'success': True, 'publicKey': settings.STRIPE_TEST_PUBLIC_KEY}
        return JsonResponse(stripe_config, safe=False)


@csrf_exempt
def create_checkout_session(request):
    if request.method == 'GET':
        if settings.STRIPE_LIVE_MODE:
            stripe.api_key = settings.STRIPE_LIVE_SECRET_KEY
        else:
            stripe.api_key = settings.STRIPE_TEST_SECRET_KEY
        try:
            # Create new Checkout Session for the order
            # Other optional params include:
            # [billing_address_collection] - to display billing address details on the page
            # [customer] - if you have an existing Stripe Customer ID
            # [payment_intent_data] - lets capture the payment later
            # [customer_email] - lets you prefill the email input in the form
            # For full details see https:#stripe.com/docs/api/checkout/sessions/create

            # ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
            problem_id = request.GET['problem_id']
            subscription_type = request.GET['subscription_type']  # either 'unit' or 'monthly'

            if subscription_type == "unit":
                # get the price_id associated with the problem
                if settings.STRIPE_LIVE_MODE:
                    # take the production price_id
                    price_id = Problem.objects.get(id=problem_id).unit_price.stripe_price_id_live
                else:
                    # take the test price_id
                    price_id = Problem.objects.get(id=problem_id).unit_price.stripe_price_id_test

            else:
                # find the price_id of the basic monthly subscription
                if settings.STRIPE_LIVE_MODE:
                    price_id = Price.objects.filter(product__name="1interviewparjour PRO")[0].stripe_price_id_live
                else:
                    price_id = Price.objects.filter(product__name="1interviewparjour PRO")[0].stripe_price_id_test

            checkout_session = stripe.checkout.Session.create(
                success_url=settings.FRONT_BASE_PATH + '/payment_success?session_id={CHECKOUT_SESSION_ID}&mail=' + request.GET['mail'] + '&token=' + request.GET["token"] + '&problem_id=' + problem_id,
                cancel_url=settings.FRONT_BASE_PATH + '/payment_canceled?mail=' + request.GET['mail'] + '&token=' + request.GET["token"],
                payment_method_types=['card'],
                mode='subscription' if subscription_type == 'monthly' else 'payment',
                line_items=[
                    {
                        'price': price_id,
                        'quantity': 1,
                    }
                ]
            )

            return JsonResponse({'sessionId': checkout_session['id']})
        except Exception as e:
            return JsonResponse({'error': str(e)})


@csrf_exempt
def success_product_buying(request):
    if request.method == 'GET':
        session_id = request.GET["session_id"]
        problem_id = request.GET['problem_id']
        token = request.GET["token"]
        mail = request.GET["mail"]

        # check the stripe session_id
        if settings.STRIPE_LIVE_MODE:
            stripe.api_key = settings.STRIPE_LIVE_SECRET_KEY
        else:
            stripe.api_key = settings.STRIPE_TEST_SECRET_KEY
        try:
            stripe_response = stripe.checkout.Session.retrieve(session_id)

            # check if its a single problem or a monthly subscription
            if stripe_response["mode"] == "payment":
                if not Session.objects.filter(stripe_session_id=session_id).exists():
                    # Create a DjangoQ Task for sending the problem to the user in pro mode this time only
                    # and register the session_id
                    """ (ONLY IN PROD WITH QCLUSTER)
                    async_task(
                        'oneinterviewparjour.mail_scheduler.send_mail.exceptionnal',
                        {
                            "mail": mail,
                            "problem_id": problem_id,
                            "session_id": session_id,
                            "future_pro_user": False
                        },
                        hook='oneinterviewparjour.mail_scheduler.send_mail.exceptionnal_hook'
                    )
                    """
                    from oneinterviewparjour.mail_scheduler.send_mail import exceptionnal, exceptionnal_hook
                    res = exceptionnal(
                        {
                            "mail": mail,
                            "problem_id": problem_id,
                            "session_id": session_id,
                            "future_pro_user": False
                        }
                    )
                    exceptionnal_hook(res)
                    return JsonResponse({'status' : 200})
                else:
                    # The session_id already exist, we do not send again the problem for security concerns.
                    return JsonResponse({'error': "The session_id already exists.", 'status' : 500})

            elif stripe_response["mode"] == "subscription":
                if not Session.objects.filter(stripe_session_id=session_id).exists():
                    # Create a DjangoQ Task for sending the problem to the user in pro mode this time
                    # , update the DB to put the user in pro and insert the session_id.
                    """ (ONLY IN PROD WITH QCLUSTER)
                    async_task(
                        'oneinterviewparjour.mail_scheduler.send_mail.exceptionnal',
                        {
                            "mail": mail,
                            "problem_id": problem_id,
                            "session_id": session_id,
                            "future_pro_user": True
                        },
                        hook='oneinterviewparjour.mail_scheduler.send_mail.exceptionnal_hook'
                    )
                    """
                    from oneinterviewparjour.mail_scheduler.send_mail import exceptionnal, exceptionnal_hook
                    res = exceptionnal(
                        {
                            "mail": mail,
                            "problem_id": problem_id,
                            "session_id": session_id,
                            "future_pro_user": True
                        }
                    )
                    exceptionnal_hook(res)
                    return JsonResponse({'status' : 200})
                else:
                    # The session_id already exist, we do not send again the problem for security concerns.
                    return JsonResponse({'error': "The session_id already exists.", 'status' : 500})
            else:
                return JsonResponse({'error': "Wrong stripe payment mode.", 'status' : 500})  # should never happen in practice.
        except InvalidRequestError:
            return JsonResponse({'error': "Wrong session_id", 'status' : 500})


@csrf_exempt
def cancel_product_buying(request):
    # TODO : there is nothing much to be done here
    # We will just produce a metric for observability but that's all
    print("[CANCEL PRODUCT BUYING] Waiting for observability to be setup")

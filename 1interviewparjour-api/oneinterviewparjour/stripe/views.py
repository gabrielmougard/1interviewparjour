from django.views.generic.base import TemplateView
from django.conf import settings
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import stripe

from oneinterviewparjour.core.models import Problem
from oneinterviewparjour.stripe.models import Price


class HomePageView(TemplateView):
    template_name = 'home.html'


class SuccessView(TemplateView):
    template_name = 'success.html'


class CancelledView(TemplateView):
    template_name = 'cancelled.html'


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
                success_url=settings.FRONT_BASE_PATH + '/payment_success?session_id={CHECKOUT_SESSION_ID}&mail=' + request.GET['mail'] + '&token=' + request.GET["token"],
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



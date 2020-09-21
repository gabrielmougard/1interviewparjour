import stripe

from django.db import models
from django.conf import settings

from oneinterviewparjour.core.models import (Problem, User)


class Product(models.Model):

    PRODUCT_TYPE = (
        ("service", "service"), # subscription in stripe language
        ("good", "good") # unit product in stripe language
    )

    active = models.BooleanField(default=True, help_text="Whether the product is active or not.")
    name = models.CharField(max_length=255, help_text="Name of the product shown in the Stripe Checkout page.")
    stripe_product_id = models.CharField(max_length=255, editable=False, null=True, help_text="The Stripe product_id. Something like 'prod_zefaXSszaf...'")
    description = models.TextField(default="", help_text="A short product desc. which will appear in the Stripe Checkout page.")
    image_link = models.TextField(
        default="",
        help_text="A link to our product image. Either it comes from our S3 bucket (recommended) or left blank to be later completed on the Stripe management dashboard"
    )
    created = models.DateTimeField(auto_now_add=True)
    livemode = models.BooleanField(default=False, help_text="If its only for test, then it should be False. Else, True.")
    product_type = models.CharField(
        max_length=20,
        choices=PRODUCT_TYPE,
        default="service",
        help_text="If its a SERVICE, then it will be a Subscription Stripe object likely to be recurrent. Else, its a GOOD and is a one time Order Stripe object."
    )

    def save(self, *args, **kwargs):
        """
        Call Stripe API to create the Product on their side and then if its ok, save it
        in our DB with the generated stripe_product_id
        """
        if settings.STRIPE_LIVE_MODE:
            stripe.api_key = settings.STRIPE_LIVE_SECRET_KEY
        else:
            stripe.api_key = settings.STRIPE_TEST_SECRET_KEY
        print(self.product_type)
        stripe_response = stripe.Product.create(
            active=self.active,
            name=self.name,
            description=self.description,
            images=[self.image_link],
            type=self.product_type,
        )
        self.stripe_product_id = stripe_response["id"]  # register this in our DB
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Price(models.Model):
    BILLING_SCHEME = (
        ("per_unit", "per_unit"),
        ("tiered", "tiered")
    )
    CURRENCY = (
        ("usd", "usd"),
        ("eur", "eur"),
        ("gbp", "gbp")
    )
    CURRENCY_SYMBOLS = {
        "usd": "$",
        "eur": "€",
        "gbp": "£"
    }
    TYPE = (
        ("recurring", "recurring"),
        ("one_time", "one_time")
    )
    RECURRING_INTERVAL = (
        (None, None),
        ("day", "day"),
        ("week", "week"),
        ("month", "month"),
        ("year", "year"),
    )
    RECURRING_USAGE_TYPE = (
        (None, None),
        ("licensed", "licensed"),
        ("metered", "metered")
    )

    active = models.BooleanField(default=True, help_text="If the price is active in Stripe")
    stripe_price_id = models.CharField(max_length=255, editable=False, null=True, help_text="The Stripe price_id. Something like 'price_zezgfXSszaf...'")
    created = models.DateTimeField(auto_now_add=True)
    livemode = models.BooleanField(default=False, help_text="If its only for test, then it should be False. Else, True.")
    unit_amount = models.IntegerField(help_text="The price of the product (in cents of the chosen currency. e.g : 699 is 6,99€ in EUR currency")
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        null=True,
        help_text="The product associated with this price"
    )
    billing_scheme = models.CharField(
        max_length=20,
        choices=BILLING_SCHEME,
        default="per_unit",
        help_text="Whether its per unit payment or tiered"
    )
    currency = models.CharField(
        max_length=20,
        choices=CURRENCY,
        default="eur",
        help_text="EUR, USD, GBP..."
    )
    price_type = models.CharField(
        max_length=20,
        choices=TYPE,
        default="recurring",
        help_text="Is it recurring (every month/every week/...) or is it a one time order ?"
    )
    recurring_interval = models.CharField(
        max_length=20,
        choices=RECURRING_INTERVAL,
        blank=True,
        default="month",
        help_text="Type of the recurring interval."
    )
    recurring_interval_count = models.IntegerField(default=1, blank=True,)
    recurring_usage_type = models.CharField(
        max_length=20,
        choices=RECURRING_USAGE_TYPE,
        blank=True,
        default="licensed",
        help_text="Usage type of the recurring payment. For us its only LICENSED."
    )

    def save(self, *args, **kwargs):
        """
        Call Stripe API to create the Price on their side and then if its ok, save it
        in our DB with the generated stripe_price_id
        """
        if settings.STRIPE_LIVE_MODE:
            stripe.api_key = settings.STRIPE_LIVE_SECRET_KEY
        else:
            stripe.api_key = settings.STRIPE_TEST_SECRET_KEY

        if self.price_type == "recurring":
            stripe_response = stripe.Price.create(
                unit_amount=self.unit_amount,
                currency=self.currency,
                product=self.product.stripe_product_id,
                active=self.active,
                billing_scheme=self.billing_scheme,
                recurring={
                    "interval": self.recurring_interval,
                    "interval_count": self.recurring_interval_count,
                    "usage_type": self.recurring_usage_type
                }
            )
        elif self.price_type == "one_time":
            stripe_response = stripe.Price.create(
                unit_amount=self.unit_amount,
                currency=self.currency,
                product=self.product.stripe_product_id,
                active=self.active,
                billing_scheme=self.billing_scheme,
            )
        else:
            raise ValueError(f"The price type {self.price_type} is not recognized.")

        self.stripe_price_id = stripe_response["id"]  # register this in our DB
        super(Price, self).save(*args, **kwargs)

    def __str__(self):
        list_unit_amount = list(str(self.unit_amount))
        list_unit_amount.insert(-2, ',')
        if len(list_unit_amount) <= 3:
            list_unit_amount.insert(0, '0')
        amount = f"{''.join(list_unit_amount)}{self.CURRENCY_SYMBOLS[self.currency]}"
        if self.price_type == "one_time":
            return f"{self.product} | {amount} | {self.stripe_price_id} | active : {self.active} | livemode : {self.livemode}"
        # it's recurring
        return f"{self.product} | {self.recurring_interval_count} x {amount}/{self.recurring_interval} | {self.stripe_price_id} | active : {self.active} | livemode : {self.livemode}"


class BuyingHash(models.Model):
    problem = models.ForeignKey(
        Problem,
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    hashed_token = models.CharField(max_length=128)


    def __str__(self):
        return (
            f"hashed_token : {self.hashed_token}\n"
            f"user : {self.user}\n"\
            f"problem : {self.problem}\n"
        )

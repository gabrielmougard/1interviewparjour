from django.contrib import admin
from .models import (
    BuyingHash,
    Product,
    Price
)

# Register your models here.
admin.site.register(Product)
admin.site.register(Price)
admin.site.register(BuyingHash)
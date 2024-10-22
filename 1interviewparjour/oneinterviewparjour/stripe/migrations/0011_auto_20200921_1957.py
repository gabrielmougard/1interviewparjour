# Generated by Django 3.1 on 2020-09-21 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stripe', '0010_auto_20200921_1531'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='price',
            name='stripe_price_id',
        ),
        migrations.RemoveField(
            model_name='product',
            name='stripe_product_id',
        ),
        migrations.AddField(
            model_name='price',
            name='stripe_price_id_live',
            field=models.CharField(editable=False, help_text="The Stripe price_id for prod mode. Something like 'price_zezgfXSszaf...'", max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='price',
            name='stripe_price_id_test',
            field=models.CharField(editable=False, help_text="The Stripe price_id for test mode. Something like 'price_zezgfXSszaf...'", max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='stripe_product_id_live',
            field=models.CharField(editable=False, help_text="The Stripe product_id for prod mode. Something like 'prod_zefaXSszaf...'", max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='stripe_product_id_test',
            field=models.CharField(editable=False, help_text="The Stripe product_id for test mode. Something like 'prod_zefaXSszaf...'", max_length=255, null=True),
        ),
    ]

# Generated by Django 3.1 on 2020-09-21 13:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stripe', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('stripe_product_id', models.CharField(max_length=255)),
                ('description', models.TextField(default='')),
                ('image_link', models.TextField(default='')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('livemode', models.BooleanField(default=False)),
                ('product_type', models.CharField(choices=[('SERVICE', 'service'), ('GOOD', 'good')], default='SERVICE', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Price',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('livemode', models.BooleanField(default=False)),
                ('unit_amount', models.IntegerField()),
                ('billing_scheme', models.CharField(choices=[('PER_UNIT', 'per_unit'), ('TIERED', 'tiered')], default='PER_UNIT', max_length=20)),
                ('currency', models.CharField(choices=[('DOLLAR', 'usd'), ('EURO', 'eur'), ('POUND', 'gbp')], default='EURO', max_length=20)),
                ('price_type', models.CharField(choices=[('RECURRING', 'recurring'), ('ONE_TIME', 'one_time')], default='RECURRING', max_length=20)),
                ('recurring_interval', models.CharField(choices=[('DAY', 'day'), ('WEEK', 'week'), ('MONTH', 'month'), ('YEAR', 'year')], default='MONTH', max_length=20)),
                ('recurring_usage_type', models.CharField(choices=[('LICENSED', 'licensed'), ('METERED', 'metered')], default='LICENSED', max_length=20)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='stripe.product')),
            ],
        ),
    ]
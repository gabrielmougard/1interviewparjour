# Generated by Django 3.1 on 2020-09-21 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stripe', '0002_price_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='price',
            name='recurring_interval',
            field=models.CharField(choices=[('NULL', None), ('DAY', 'day'), ('WEEK', 'week'), ('MONTH', 'month'), ('YEAR', 'year')], default='MONTH', max_length=20),
        ),
        migrations.AlterField(
            model_name='price',
            name='recurring_usage_type',
            field=models.CharField(choices=[('NULL', None), ('LICENSED', 'licensed'), ('METERED', 'metered')], default='LICENSED', max_length=20),
        ),
    ]
# Generated by Django 3.1 on 2020-09-21 20:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stripe', '0011_auto_20200921_1957'),
    ]

    operations = [
        migrations.DeleteModel(
            name='BuyingHash',
        ),
    ]

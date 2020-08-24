# Generated by Django 3.1 on 2020-08-24 10:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='problem',
            old_name='difficulte',
            new_name='difficulty',
        ),
        migrations.RenameField(
            model_name='problem',
            old_name='enonce',
            new_name='exercise',
        ),
        migrations.RenameField(
            model_name='program',
            old_name='heure',
            new_name='hour',
        ),
        migrations.RenameField(
            model_name='program',
            old_name='id_pb',
            new_name='problem',
        ),
        migrations.RenameField(
            model_name='program',
            old_name='id_user',
            new_name='user',
        ),
        migrations.AlterField(
            model_name='user',
            name='deinscription_timestamp',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]

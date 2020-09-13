# Generated by Django 3.1 on 2020-09-13 09:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0007_programhistory'),
    ]

    operations = [
        migrations.CreateModel(
            name='BuyingHash',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hashed_token', models.CharField(max_length=128)),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.problem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.user')),
            ],
        ),
    ]

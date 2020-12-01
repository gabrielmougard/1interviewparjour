# Generated by Django 3.1 on 2020-11-23 18:20

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_remove_planningevent_end_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='problem',
            old_name='topics',
            new_name='topic1',
        ),
        migrations.AddField(
            model_name='problem',
            name='topic2',
            field=multiselectfield.db.fields.MultiSelectField(choices=[(0, 'Tri'), (1, 'Aléatoire'), (2, 'Recherche'), (3, 'Graphe'), (4, 'Glouton'), (5, 'Programmation dynamique'), (6, 'Manipulation de bits'), (7, 'NP complet'), (8, 'Récursivité'), (9, 'Théorie des jeux'), (10, 'Implémentation'), (11, 'Constructifs'), (12, 'Chaîne de caractères'), (13, 'Géométrie'), (14, 'Mathématiques'), (15, 'Backtracking'), (16, 'Diviser pour Régner')], default='Aléatoire', max_length=40),
        ),
        migrations.AddField(
            model_name='problem',
            name='topic3',
            field=multiselectfield.db.fields.MultiSelectField(choices=[(0, 'Tri'), (1, 'Aléatoire'), (2, 'Recherche'), (3, 'Graphe'), (4, 'Glouton'), (5, 'Programmation dynamique'), (6, 'Manipulation de bits'), (7, 'NP complet'), (8, 'Récursivité'), (9, 'Théorie des jeux'), (10, 'Implémentation'), (11, 'Constructifs'), (12, 'Chaîne de caractères'), (13, 'Géométrie'), (14, 'Mathématiques'), (15, 'Backtracking'), (16, 'Diviser pour Régner')], default='Aléatoire', max_length=40),
        ),
    ]

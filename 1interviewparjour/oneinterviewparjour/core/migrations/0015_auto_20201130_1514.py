# Generated by Django 3.1 on 2020-11-30 15:14

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_auto_20201130_1501'),
    ]

    operations = [
        migrations.AlterField(
            model_name='problem',
            name='topic1',
            field=multiselectfield.db.fields.MultiSelectField(choices=[(0, 'Tri'), (1, 'Aléatoire'), (2, 'Recherche'), (3, 'Graphe'), (4, 'Glouton'), (5, 'Programmation dynamique'), (6, 'Manipulation de bits'), (7, 'NP complet'), (8, 'Récursivité'), (9, 'Théorie des jeux'), (10, 'Implémentation'), (11, 'Constructifs'), (12, 'Chaîne de caractères'), (13, 'Géométrie'), (14, 'Mathématiques'), (15, 'Backtracking'), (16, 'Diviser pour Régner')], default='Aléatoire', max_length=40),
        ),
        migrations.AlterField(
            model_name='problem',
            name='topic2',
            field=multiselectfield.db.fields.MultiSelectField(choices=[(0, 'Tri'), (1, 'Aléatoire'), (2, 'Recherche'), (3, 'Graphe'), (4, 'Glouton'), (5, 'Programmation dynamique'), (6, 'Manipulation de bits'), (7, 'NP complet'), (8, 'Récursivité'), (9, 'Théorie des jeux'), (10, 'Implémentation'), (11, 'Constructifs'), (12, 'Chaîne de caractères'), (13, 'Géométrie'), (14, 'Mathématiques'), (15, 'Backtracking'), (16, 'Diviser pour Régner')], default='Aléatoire', max_length=40),
        ),
        migrations.AlterField(
            model_name='problem',
            name='topic3',
            field=multiselectfield.db.fields.MultiSelectField(choices=[(0, 'Tri'), (1, 'Aléatoire'), (2, 'Recherche'), (3, 'Graphe'), (4, 'Glouton'), (5, 'Programmation dynamique'), (6, 'Manipulation de bits'), (7, 'NP complet'), (8, 'Récursivité'), (9, 'Théorie des jeux'), (10, 'Implémentation'), (11, 'Constructifs'), (12, 'Chaîne de caractères'), (13, 'Géométrie'), (14, 'Mathématiques'), (15, 'Backtracking'), (16, 'Diviser pour Régner')], default='Aléatoire', max_length=40),
        ),
    ]

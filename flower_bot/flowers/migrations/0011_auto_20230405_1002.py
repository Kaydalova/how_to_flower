# Generated by Django 2.2.16 on 2023-04-05 07:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('flowers', '0010_auto_20230404_1901'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usersflower',
            old_name='flower',
            new_name='flower_type',
        ),
    ]

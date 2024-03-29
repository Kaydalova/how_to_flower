# Generated by Django 2.2.16 on 2023-04-14 08:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('flowers', '0011_auto_20230405_1002'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='flower',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='flower', to='flowers.UsersFlower', verbose_name='Цветочек'),
        ),
        migrations.AlterField(
            model_name='usersflower',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL, verbose_name='Владелец'),
        ),
    ]

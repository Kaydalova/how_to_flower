# Generated by Django 2.2.16 on 2023-04-14 09:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('flowers', '0012_auto_20230414_1127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='flower',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='schedules', to='flowers.UsersFlower', verbose_name='Цветочек'),
        ),
        migrations.AlterField(
            model_name='usersflower',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='flowers', to=settings.AUTH_USER_MODEL, verbose_name='Владелец'),
        ),
    ]
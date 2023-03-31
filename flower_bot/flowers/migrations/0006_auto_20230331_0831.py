# Generated by Django 2.2.16 on 2023-03-31 05:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flowers', '0005_auto_20230320_0444'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='schedule',
            options={'ordering': ('day',), 'verbose_name': 'Расписание', 'verbose_name_plural': 'Расписание'},
        ),
        migrations.AlterField(
            model_name='flower',
            name='light',
            field=models.CharField(max_length=1000, verbose_name='Освещенность'),
        ),
        migrations.AlterField(
            model_name='flower',
            name='temperature',
            field=models.CharField(max_length=1000, verbose_name='Оптимальная температура'),
        ),
        migrations.AlterField(
            model_name='usersflower',
            name='notification',
            field=models.BooleanField(verbose_name='Оповещения в телеграм'),
        ),
    ]

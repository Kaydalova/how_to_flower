# Generated by Django 2.2.19 on 2023-03-17 09:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('flowers', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='flower',
            options={'ordering': ('name',), 'verbose_name': 'Растение', 'verbose_name_plural': 'Растения'},
        ),
        migrations.CreateModel(
            name='UsersFlower',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=400, verbose_name='Имя цветочка')),
                ('image', models.ImageField(default=None, null=True, upload_to='flowers/images/', verbose_name='Фотография цветочка')),
                ('flower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='flowers.Flower', verbose_name='Вид цветочка')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='flower', to=settings.AUTH_USER_MODEL, verbose_name='Владелец')),
            ],
            options={
                'verbose_name': 'Цветочек',
                'verbose_name_plural': 'Цветочки',
                'ordering': ('name',),
            },
        ),
    ]

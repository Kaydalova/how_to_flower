from django.db import models
from users.models import User


class Flower(models.Model):
    name = models.CharField(
        verbose_name='Название растения',
        unique=True,
        max_length=400)
    type = models.CharField(
        verbose_name='Тип растения',
        max_length=400)
    temperature = models.CharField(
        verbose_name='Оптимальная температура',
        max_length=100)
    light = models.CharField(
        verbose_name='Световой режим',
        max_length=1000)
    watering = models.CharField(
        verbose_name='Режим полива',
        max_length=1000)

    class Meta:
        ordering = ('name',)
        verbose_name = 'Каталог растений'
        verbose_name_plural = 'Каталог растений'

    def __str__(self):
        return self.name


class UsersFlower(models.Model):
    flower = models.ForeignKey(
        Flower,
        on_delete=models.CASCADE,
        verbose_name='Вид цветочка')
    name = models.CharField(
        verbose_name='Имя цветочка',
        max_length=400)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='Владелец',
        related_name='flower')
    image = models.ImageField(
        upload_to='flowers/images/',
        null=True,
        default=None,
        verbose_name='Фотография цветочка')

    class Meta:
        ordering = ('name',)
        verbose_name = 'Цветочек'
        verbose_name_plural = 'Цветочки'

    def __str__(self):
        return self.name

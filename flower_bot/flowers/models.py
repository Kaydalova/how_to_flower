from datetime import datetime

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
    image = models.ImageField(
        upload_to='flowers/images/',
        null=True,
        default=None,
        verbose_name='Фотография растения')
    temperature = models.CharField(
        verbose_name='Оптимальная температура',
        max_length=1000)
    light = models.CharField(
        verbose_name='Освещенность',
        max_length=1000)
    watering = models.CharField(
        verbose_name='Режим полива, подкормки и опрыскивания',
        max_length=1000)
    pat_friendly = models.CharField(
        verbose_name='Пэт-френдли',
        max_length=1000)
    watering_int = models.SmallIntegerField(
        verbose_name='Частота полива для бота')
    sprinkle_int = models.SmallIntegerField(
        verbose_name='Частота опрыскиваний для бота')
    feeding_int = models.SmallIntegerField(
        verbose_name='Подкормка для бота, номер месяца')
    pot = models.CharField(
        verbose_name='Горшочек',
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
    notification = models.BooleanField(
        verbose_name='Оповещения в телеграм',
        default=False)

    class Meta:
        ordering = ('name',)
        verbose_name = 'Цветочек'
        verbose_name_plural = 'Цветочки'

    def __str__(self):
        return self.name

# каждый день из бд достает все записи модели скедьюл,
# в которых день недели совпадает с текущим.
# Для каждого события из всех событий производит отправку месседжа
# с указанным фловер неймом указанному юзеру(фловер оунеру)
# в тг в указанное время


class Schedule(models.Model):
    flower = models.ForeignKey(
        UsersFlower,
        on_delete=models.CASCADE,
        verbose_name='Цветочек')
    day = models.SmallIntegerField(
        verbose_name='День недели от 0 до 6')
    time = models.TimeField(
        default=datetime.now,
        verbose_name='Время оповещения')
    action = models.SmallIntegerField(
        verbose_name='1 - полить, 0 - побрызгать, 2 - подкормить')

    class Meta:
        ordering = ('day',)
        verbose_name = 'Расписание'
        verbose_name_plural = 'Расписание'

    def __str__(self):
        return self.flower.name

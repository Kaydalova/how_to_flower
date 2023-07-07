from datetime import datetime

from django.db import models

from users.models import User


class Flower(models.Model):
    """
    Модель для вида растения.
    Attrs:
    - name: Название растения
    - type: Вид растения
    - image: Фото растения
    - temperature: Рекомендуемая температура для содержания
    - light: Рекомендуемая освещенность
    - watering: Режим полива
    - pet_friendly: Безопасен ил для животных
    - pot: Рекомендации по горшку
    """
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
    pet_friendly = models.CharField(
        verbose_name='Пэт-френдли',
        max_length=1000)
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
    """
    Модель для растения пользователя.
    Attrs:
    - flower_type: Вид растения, foreign key
    - name: Имя растения
    - owner: Владелец растения
    - image: Фото растения(необязательно поле)
    - notification: Булево поле, включены ли уведомления
    """

    flower_type = models.ForeignKey(
        Flower,
        on_delete=models.CASCADE,
        verbose_name='Вид цветочка')
    name = models.CharField(
        verbose_name='Имя цветочка',
        max_length=400)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='Владелец')
    image = models.ImageField(
        upload_to='flowers/images/',
        null=True,
        blank=True,
        verbose_name='Фотография цветочка')
    notification = models.BooleanField(
        verbose_name='Оповещения в телеграм',
        default=False)

    class Meta:
        verbose_name = 'Цветочек'
        verbose_name_plural = 'Цветочки'

    def __str__(self):
        return self.name


class Schedule(models.Model):
    """
    Модель для расписания и отправки уведомлений пользователю.
    Attrs:
    - flower: цветок, для которого создано расписание
    - once_every_three_days: булево поле.
    True - если пользователь выбрал ухаживать за цветком раз в три дня,
    значение поля day после каждого уведомления будет меняться с шагом в 3 дня.
    - day: День недели, в который будет приходить уведомление
    - time: Время уведомления
    - action: Что нужно сделать пользователю:
    1 - полить, 0 - побрызгать, 2 - подкормить
    """
    flower = models.ForeignKey(
        UsersFlower,
        on_delete=models.CASCADE,
        verbose_name='Цветочек',
        related_name='schedules')
    once_every_three_days = models.BooleanField(
        default=False)
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

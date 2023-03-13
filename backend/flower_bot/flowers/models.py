from django.db import models


class Temperature(models.Model):
    name = models.CharField(
        verbose_name='Оптимальная температура',
        max_length=100)

    class Meta:
        verbose_name = 'Температурный режим'
        verbose_name_plural = 'Температурные режимы'

    def __str__(self):
        return self.name


class Light(models.Model):
    name = models.CharField(
        verbose_name='Оптимальный свет')

    class Meta:
        verbose_name = 'Световой режим'
        verbose_name_plural = 'Световые режимы'

    def __str__(self):
        return self.name


class Watering(models.Model):
    name = models.CharField(
        verbose_name='Полив')
    
    class Meta:
        verbose_name = 'Полив'
        verbose_name_plural = 'Полив'

    def __str__(self):
        return self.name


class Flower(models.Model):
    name = models.CharField(
        verbose_name='Название растения',
        unique=True,
        max_length=400)
    temperature = models.CharField(
        verbose_name='Оптимальная температура',
        max_length=100)
    light = models.CharField(
        verbose_name='Световой режим')

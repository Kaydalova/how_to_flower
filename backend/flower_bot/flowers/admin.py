from django.contrib import admin

from .models import Flower, UsersFlower, Schedule


@admin.register(Flower)
class FlowerAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'type',
        'temperature',
        'light',
        'watering',
        'watering_int',
        'feeding_int',
        'pot'
    )


@admin.register(UsersFlower)
class UsersFlowerAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'owner',
        'name',
        'flower',
        'notification'
    )


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'flower',
        'day',
        'time',
        'action'
    )

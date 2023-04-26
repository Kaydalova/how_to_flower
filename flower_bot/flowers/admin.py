from django.contrib import admin

from .models import Flower, Schedule, UsersFlower


@admin.register(Flower)
class FlowerAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'image',
        'type',
        'temperature',
        'light',
        'watering',
        'pet_friendly',
        'pot'
    )


@admin.register(UsersFlower)
class UsersFlowerAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'owner',
        'name',
        'flower_type',
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

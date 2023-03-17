from django.contrib import admin

from .models import Flower, UsersFlower


@admin.register(Flower)
class FlowerAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'type',
        'temperature',
        'light',
        'watering'
    )


@admin.register(UsersFlower)
class UsersFlowerAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'owner',
        'name',
        'flower'
    )

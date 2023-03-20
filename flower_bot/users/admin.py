from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'username',
        'chat_id',
        'first_name',
        'last_name',
        'email',
        'password'
    )

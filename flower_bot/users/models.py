from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models

from api.validators import validate_real_name, validate_username


class User(AbstractUser):
    username = models.CharField(
        'Логин', max_length=settings.USER_MAX_LENGTH, unique=True,
        validators=[UnicodeUsernameValidator, validate_username])
    first_name = models.CharField(
        'Имя', max_length=settings.USER_MAX_LENGTH,
        validators=[validate_real_name], blank=False)
    password = models.CharField(
        'Пароль', max_length=settings.USER_MAX_LENGTH)
    email = models.EmailField(
        'Email', max_length=settings.EMAIL_MAX_LENGTH, unique=True)
    chat_id = models.CharField(
        'Chat id TG', max_length=settings.USER_MAX_LENGTH, blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name']

    class Meta:
        ordering = ('id',)
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return self.username

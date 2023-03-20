import re

from django.core.exceptions import ValidationError


def validate_username(value):
    """
    Метод проверяет соответствует username ожиданиям.
    Если нет - выбрасывает ValidationError.
    """
    if value.lower() == 'me':
        raise ValidationError({
            f'Username не может быть {value}'})


def validate_real_name(value):
    """
    Метод проверяет соответствует ли имя и фамилия
    пользователя заданному регулярному выражению.
    Если нет - выбрасывает ValidationError.
    """
    reg = r'^[\w-]+\Z'

    if not re.fullmatch(reg, value):
        raise ValidationError({
            'Недопустимое значение имени {value}'})

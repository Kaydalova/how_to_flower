from django.shortcuts import get_object_or_404
from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from flowers.models import Flower, Schedule, UsersFlower
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Сериализатор для работы с моделью User.
    """

    class Meta:
        model = User
        fields = ('id', 'email',
                  'username', 'first_name',
                  'chat_id')


class FlowerSerializer(serializers.ModelSerializer):
    """
    Сериализатор для просмотра объектов модели Flower.
    """
    class Meta:
        model = Flower
        fields = ('id',
                  'name',
                  'type',
                  'temperature',
                  'light',
                  'watering',
                  'pet_friendly',
                  'pot',
                  'image',
                  )


class UsersFlowerSerializer(serializers.ModelSerializer):
    """
    Сериализатор для добавления пользователем своего цветка
    в личный кабинет.
    """
    image = Base64ImageField(use_url=True, max_length=None, required=False)
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = UsersFlower
        fields = (
            'id',
            'flower_type',
            'name',
            'owner',
            'image',
            'notification',
        )

    def validate(self, data):
        flower = get_object_or_404(
            Flower,
            id=self.initial_data.get('flower_type'))
        print(flower)
        print(self.initial_data)
        if not self.initial_data.get('image'):
            image = flower.image
        data.update({
            'flower_type': flower,
            'image': image,
        })

        return data


class ScheduleSerializer(serializers.ModelSerializer):
    """
    Сериализатор для просмотра объектов модели Schedule.
    """
    class Meta:
        model = Schedule
        fields = ('id',
                  'flower',
                  'once_every_three_days',
                  'day',
                  'time',
                  'action',
                  )

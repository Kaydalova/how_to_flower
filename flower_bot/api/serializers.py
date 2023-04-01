from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from users.models import User
from flowers.models import Flower, UsersFlower
from django.shortcuts import get_object_or_404


class UserSerializer(serializers.ModelSerializer):
    """
    Сериализатор для работы с моделью User.
    """

    class Meta:
        model = User
        fields = ('email', 'id',
                  'username', 'first_name',
                  'last_name', 'chat_id')


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
                  'pat_friendly',
                  'pot',
                  'watering_int',
                  'sprinkle_int',
                  'feeding_int',
                  )


class UsersFlowerSerializer(serializers.ModelSerializer):
    """
    Сериализатор для добавления пользователем своего цветка
    в личный кабинет.
    """
    image = Base64ImageField(use_url=True, max_length=None)
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = UsersFlower
        fields = (
            'id',
            'flower',
            'name',
            'owner',
            'image',
            'notification',
        )

    def validate(self, data):
        flower = get_object_or_404(
            Flower,
            id=self.initial_data.get('flower'))
        data.update({
            'flower': flower
        })
        return data

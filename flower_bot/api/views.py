from rest_framework import viewsets

from .serializers import (FlowerSerializer,
                          UsersFlowerSerializer,
                          ScheduleSerializer)
from flowers.models import Flower, UsersFlower, Schedule
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404


class FlowerViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Для цветов нужны только list() и retrieve() методы.
    Доступен для чтения всем, изменять можно только через админку.
    """
    queryset = Flower.objects.all()
    serializer_class = FlowerSerializer


class UsersFlowerViewSet(viewsets.ModelViewSet):
    queryset = UsersFlower.objects.all()
    serializer_class = UsersFlowerSerializer

    def perform_create(self, serializer):
        action_frequency = {
            1: [3],
            2: [2, 5],
            3: [1, 3, 5],
            4: [0, 2, 4, 6],
            5: [0, 1, 3, 4, 5],
            6: [0, 1, 2, 4, 5, 6],
            7: [0, 1, 2, 3, 4, 5, 6]
        }
        action_codes = {
            'sprinkle': 0,
            'watering': 1,
            'feeding': 2
        }
        serializer.save(owner=self.request.user)
        users_flower = get_object_or_404(
            UsersFlower,
            id=serializer.data.get('id'))
        flower_object = get_object_or_404(
            Flower,
            id=serializer.data.get('flower'))
        watering = flower_object.watering_int
        sprinkle = flower_object.sprinkle_int
        upload_list = []
        for i in action_frequency[watering]:
            upload_list.append(
                Schedule(
                    flower=users_flower,
                    day=i,
                    action=action_codes['watering']))
        for i in action_frequency[sprinkle]:
            upload_list.append(
                Schedule(
                    flower=users_flower,
                    day=i,
                    action=action_codes['sprinkle']))
        Schedule.objects.bulk_create(upload_list)


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    # permission_classes = (OwnerOrReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    pagination_class = None
    filterset_fields = ('flower',)

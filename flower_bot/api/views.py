from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from flowers.models import Flower, Schedule, UsersFlower

from .serializers import (FlowerSerializer, ScheduleSerializer,
                          UsersFlowerSerializer)


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
        serializer.save(owner=self.request.user)


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    # permission_classes = (OwnerOrReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    pagination_class = None
    filterset_fields = ('flower',)

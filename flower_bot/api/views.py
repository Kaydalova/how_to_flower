from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

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
    """
    Обрабатывает запросы только от авторизованного пользователя.
    Методы list и retrive отдают только те цветы,
    которые принадлежат юзеру.
    """
    queryset = UsersFlower.objects.all()
    serializer_class = UsersFlowerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return UsersFlower.objects.filter(
            owner=self.request.user)


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    # permission_classes = (OwnerOrReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    pagination_class = None
    filterset_fields = ('flower',)

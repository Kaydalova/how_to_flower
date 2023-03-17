from rest_framework import viewsets
from .serializers import FlowerSerializer, UsersFlowerSerializer
from flowers.models import Flower, UsersFlower


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


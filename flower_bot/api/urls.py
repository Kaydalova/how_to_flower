from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api import views

app_name = 'api'

router = DefaultRouter()
router.register('flowers', views.FlowerViewSet, basename='flowers')
router.register('my_flowers', views.UsersFlowerViewSet, basename='my_flowers')
router.register('schedule', views.ScheduleViewSet, basename='schedule')


urlpatterns = [
    path('', include(router.urls)),
    path('', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken'))]

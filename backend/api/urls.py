from django.urls import path, include
from landing import views
from rest_framework import routers
from api.views import ReservationViewSet
from django.conf.urls import url


router = routers.DefaultRouter()
router.register(r'reservations', ReservationViewSet)

urlpatterns = [
    path('', include(router.urls))
]

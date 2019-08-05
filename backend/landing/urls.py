from django.urls import path
from landing import views

urlpatterns = [
    path('', views.index, name="index"),
    path('generate_properties', views.generate_properties, 
    name="generate_properties"),
    path('generate_reservations', views.generate_reservations,
    name="generate_reservations"),
    path('generate_users', views.generate_users,
    name="generate_users"),
    path('init', views.init,
    name="init")
]
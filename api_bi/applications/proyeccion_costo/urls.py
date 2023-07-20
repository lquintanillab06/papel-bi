from django.urls import path
from . import views 

urlpatterns = [
   path('proyeccion_costo/', views.proyeccion_costo, name='proyeccion_costo'),
]
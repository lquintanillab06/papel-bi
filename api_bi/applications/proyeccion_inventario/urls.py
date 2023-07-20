from django.urls import path
from . import views 

urlpatterns = [
   path('proyeccion_inventario/', views.proyeccion_inventario, name='proyeccion_inventario'),
]
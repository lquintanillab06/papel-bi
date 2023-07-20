from django.urls import path
from . import views 

urlpatterns = [
   path('buscar_producto/', views.buscar_producto, name='buscar_producto'),
]
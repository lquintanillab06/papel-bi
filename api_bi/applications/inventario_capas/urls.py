from django.urls import path
from . import views 

urlpatterns = [
   path('inventario_capas/', views.inventario_capas, name='inventario_capas'),
]
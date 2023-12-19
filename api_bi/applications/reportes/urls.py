from django.urls import path
from . import views 

urlpatterns = [
     path('mejores_clientes', views.mejores_clientes_report, name='mejores_clientes'),
     path('baja_en_ventas', views.baja_en_ventas_report, name='baja_en_ventas'),
]
from django.urls import path
from . import views 

urlpatterns = [
    path('analisis_venta/', views.analisis_venta, name='analisis_venta'),
    path('analisis_venta_dinamico/', views.analisis_venta_dinamico, name='analisis_venta_dinamico'),
    path('ventas_dimension/', views.ventas_dimension, name='ventas_dimension'),
]
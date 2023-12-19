from django.urls import path
from . import views 

urlpatterns = [
     path('comparativo_ventas/', views.comparativo_ventas, name='comparativo_ventas'),
]
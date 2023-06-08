
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ventas/',include('applications.analisis_ventas.urls')),
    path('',include('applications.analisis_costo.urls')),
]

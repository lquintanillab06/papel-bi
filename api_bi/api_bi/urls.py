
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ventas/',include('applications.analisis_ventas.urls')),
    path('',include('applications.analisis_costo.urls')),
    path('capas/',include('applications.inventario_capas.urls')),
    path('costo/',include('applications.proyeccion_costo.urls')),
    path('inventario/',include('applications.proyeccion_inventario.urls')),
    path('comparativo/',include('applications.comparativo.urls')),
    path('reportes/',include('applications.reportes.urls')),
    path('',include('applications.core.urls')),
]

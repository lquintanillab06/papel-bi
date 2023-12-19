from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from applications.analisis_ventas.models import AnalisisVentasDet
from applications.analisis_ventas.serializers.analisis_venta_serializer import ProyeccionInventarioSerializer, ProyeccionInventarioAcumuladoSerializer


# Create your views here.

@api_view(['POST'])
def proyeccion_inventario(request):

    print('loading Inventario ...')
    mes_exis = request.data.get('mes')
    ejercicio_exis = request.data.get('ejercicio')
    subdimension = 'clave'
        
    ventas, venta_neta , kilos, utilidad, costo_neto = AnalisisVentasDet.objects.analisis_proyeccion_inventario(subdimension,mes_exis,ejercicio_exis,**request.data)

    if venta_neta:
            porc_utilidad = round(((utilidad * 100) / venta_neta),2)
    else:
        porc_utilidad = 0
    if kilos:
        precio_kilo= round((venta_neta / kilos),2)
        costo_kilo = round((costo_neto / kilos),2)
    else:    
        precio_kilo = 0
        costo_kilo = 0
    ventas_det_serialized = ProyeccionInventarioSerializer(ventas, many = True)

    return Response(
        {
        "data":ventas_det_serialized.data,
        "totales":{
                    "ventas":venta_neta,
                    "kilos":kilos, 
                    "precio_kilo": precio_kilo,
                    "costo_neto": costo_neto,
                    "costo_kilo": costo_kilo, 
                    "utilidad": utilidad,
                    "porc_utilidad": porc_utilidad

                }
        }
    )

@api_view(['POST'])
def proyeccion_inventario_acumulado(request): 

    print('loading Inventario Acumulado ...')
    mes_exis = request.data.get('mes')
    mes = request.data.get('mes')
    ejercicio_exis = request.data.get('ejercicio')
    subdimension = 'clave'

    request.data.pop('mes')
        
    ventas, venta_neta , kilos, utilidad, costo_neto = AnalisisVentasDet.objects.analisis_proyeccion_inventario_acumulado(subdimension,mes_exis,ejercicio_exis,mes,**request.data)

    if venta_neta:
            porc_utilidad = round(((utilidad * 100) / venta_neta),2)
    else:
        porc_utilidad = 0
    if kilos:
        precio_kilo= round((venta_neta / kilos),2)
        costo_kilo = round((costo_neto / kilos),2)
    else:    
        precio_kilo = 0
        costo_kilo = 0
    ventas_det_serialized = ProyeccionInventarioAcumuladoSerializer(ventas, many = True)

    return Response(
        {
        "data":ventas_det_serialized.data,
        "totales":{
                    "ventas":venta_neta,
                    "kilos":kilos, 
                    "precio_kilo": precio_kilo,
                    "costo_neto": costo_neto,
                    "costo_kilo": costo_kilo, 
                    "utilidad": utilidad,
                    "porc_utilidad": porc_utilidad

                }
        }
    )

    
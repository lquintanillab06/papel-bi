from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import  AnalisisVentasDet
from .serializers.analisis_venta_serializer import AnalisisVentaSerializer,AnalisisModelSerializer

@api_view(['GET'])
def analisis_venta(request):
    ejercicio = request.data.get('ejercicio')
    mes = request.data.get('mes')
    dimension = request.data.get('dimension')
    dimension_value = request.data.get('dimension_value')
    subdimension = request.data.get('subdimension') 
    origen = request.data.get('origen')
    nacional = request.data.get('nacional')
    ventas_cliente = AnalisisVentasDet.objects.analisis_venta(ejercicio,mes,dimension,subdimension,dimension_value,origen,nacional)
    ventas_det_serialized = AnalisisVentaSerializer(ventas_cliente, many = True)
    return Response({"data":ventas_det_serialized.data,"totales":{"ventas":1000,"pedidos":10000}})

@api_view(['POST'])
def analisis_venta_dinamico(request):
    print('loading ...')
   
    subdimension = request.data.get('subdimension') 
    request.data.pop('subdimension')
    if request.data.get('nacional') == None:
        request.data.pop('nacional')

    if not request.data.get('origen'):
        request.data.pop('origen')
        
    ventas, venta_neta , kilos, utilidad, costo_neto = AnalisisVentasDet.objects.analisis_venta_dinamico(subdimension,**request.data)
    
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
    ventas_det_serialized = AnalisisVentaSerializer(ventas, many = True)
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
def ventas_dimension(request):
    print(request.data)
    request.data.pop('subdimension')
    if not request.data.get('nacional'):
        request.data.pop('nacional')
    if not request.data.get('origen'):
        request.data.pop('origen')
    ventas = AnalisisVentasDet.objects.ventas_dimension(**request.data)
    ventas_det_serialized = AnalisisModelSerializer(ventas, many = True)
    return Response({
        "data": ventas_det_serialized.data
    })

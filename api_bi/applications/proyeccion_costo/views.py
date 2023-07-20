from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from applications.analisis_ventas.models import AnalisisVentasDet
from applications.analisis_ventas.serializers.analisis_venta_serializer import ProyeccionCostoSerializer


# Create your views here.

@api_view(['POST'])
def proyeccion_costo(request):

    print('loading ...')
    subdimension = request.data.get('subdimension') 
    request.data.pop('subdimension')
    if request.data.get('nacional') == None:
        request.data.pop('nacional')

    if not request.data.get('origen'):
        request.data.pop('origen')

    
    ventas, venta_neta , kilos, utilidad, costo_neto = AnalisisVentasDet.objects.analisis_proyeccion_costo(subdimension,**request.data)

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
    ventas_det_serialized = ProyeccionCostoSerializer(ventas, many = True)

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

    
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers.inventario_capas_serializer import InventarioCapasSerializer
from applications.analisis_ventas.models import AnalisisVentasDet
from applications.analisis_ventas.serializers.analisis_venta_serializer import AnalisisVentaSerializer
from .models import InventarioCapas

# Create your views here.

@api_view(['POST'])
def inventario_capas(request):

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

    
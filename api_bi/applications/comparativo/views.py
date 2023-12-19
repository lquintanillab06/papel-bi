from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from applications.analisis_ventas.models import AnalisisVentasDet
from applications.analisis_ventas.serializers.analisis_venta_serializer import  ComparativoSerializer

# Create your views here.

@api_view(['POST'])
def comparativo_ventas(request):
    print('Ejecutando el comparativo de ventas...')
    dimension = request.data.get('dimension')
    ejercicio1 = request.data.get('ejercicio1')
    ejercicio2 = request.data.get('ejercicio2')
    mes_ini1 = request.data.get('mes_ini1')
    mes_fin1 = request.data.get('mes_fin1')
    mes_ini2 = request.data.get('mes_ini2')
    mes_fin2 = request.data.get('mes_fin2')
    print(request.data)

    ventas = AnalisisVentasDet.objects.comparativo_ventas(dimension,mes_ini1,mes_fin1,ejercicio1, mes_ini2, mes_fin2, ejercicio2)
    ventas_det_serialized = ComparativoSerializer(ventas, many = True)

    return Response({"Message": "Succesfully", "data":ventas_det_serialized.data})
    #return Response({"Message": "Succesfully"})

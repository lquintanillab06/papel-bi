from django.shortcuts import render
from .reportes.mejores_clientes import mejores_clientes
from .reportes.baja_en_ventas import baja_en_ventas
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse



@api_view(['GET'])
def mejores_clientes_report(request):

    print(request.query_params)
    
    fecha_ini = request.query_params['fecha_ini']
    fecha_fin = request.query_params['fecha_fin']
    origen = request.query_params['origen']
    no_clientes = int(request.query_params['no_clientes'])

    reporte = mejores_clientes(fecha_ini,fecha_fin,origen,no_clientes)
    print("Running !!!!")

    #return Response({"Message": "Succesfully"})
    return HttpResponse(reporte, content_type='application/pdf')



@api_view(['GET'])
def baja_en_ventas_report(request):
    fecha_ini = request.query_params['fecha_ini']
    print(fecha_ini)
    baja_en_ventas()
    return Response({"Message": "Succesfully2"})

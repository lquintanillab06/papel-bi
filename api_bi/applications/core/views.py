from django.shortcuts import render
from rest_framework.response import  Response
from  rest_framework.decorators import api_view
from .models import Producto
from .serializers.producto_serializers import ProductoSerializer
from django.db.models import Q



@api_view(['GET'])
def buscar_producto(request):
    print('Buscando un producto')
    print(request.query_params)
    productos_response= []
    if not request.query_params['producto'] == '':
        print(request.query_params['producto'])
        productos = Producto.objects.filter(Q(clave__istartswith= request.query_params['producto']) | Q(descripcion__istartswith = request.query_params['producto']) )
        productos_serialized = ProductoSerializer(productos, many = True)
        productos_response = productos_serialized.data
   
    return Response(productos_response)


from rest_framework import serializers
from ..models import  AnalisisVentasDet

class AnalisisVentaSerializer(serializers.Serializer):
    subdimension = serializers.CharField(max_length = 255)
    ejercicio = serializers.IntegerField()
    mes = serializers.IntegerField()
    sum_importe = serializers.DecimalField( max_digits=18, decimal_places=2)
    sum_imp_neto = serializers.DecimalField( max_digits=18, decimal_places=2)
    sum_costo_neto = serializers.DecimalField( max_digits=18, decimal_places=2)
    utilidad = serializers.DecimalField( max_digits=18, decimal_places=2)
    porcentaje_utilidad = serializers.DecimalField( max_digits=18, decimal_places=2)
    sum_kilos = serializers.DecimalField( max_digits=18, decimal_places=2)
    precio_kilo = serializers.DecimalField( max_digits=18, decimal_places=2)
    porc_part_vn = serializers.DecimalField( max_digits=18, decimal_places=2)
    porc_part_ut = serializers.DecimalField( max_digits=18, decimal_places=2)
            

class AnalisisModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalisisVentasDet
        fields =['origen_id','cliente','tipo','docto','fecha','clave','descripcion','imp_neto','origen','suc','kilos','costo']
        #fields ="__all__"
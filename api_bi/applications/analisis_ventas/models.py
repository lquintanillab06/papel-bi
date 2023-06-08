from django.db import models
from .managers.analisis_venta_manager import AnalisisVentaManager

# Create your models here.


class AnalisisVentasDet(models.Model):
     
    tipo = models.CharField(max_length=3,null=False, blank=False)
    origen_id = models.CharField(max_length=255, null=False, blank= False)
    inventario_id = models.CharField(max_length=255, null=False, blank= False)
    cliente_id = models.CharField(max_length=255, null=False, blank= False)
    cliente = models.CharField(max_length=255, null=False, blank= False)
    docto = models.CharField(max_length=20, null=False, blank= False)
    origen = models.CharField(max_length=3, null=False, blank= False)
    sucursal_id = models.CharField(max_length=255, null=False, blank= False)
    suc = models.CharField(max_length=50, null=False, blank= False)
    fecha = models.DateField(auto_now=False, auto_now_add=False)
    linea_id = models.CharField(max_length=255, null=False, blank= False)
    linea =models.CharField(max_length=30, null=False, blank= False)
    marca_id = models.CharField(max_length=255, null=False, blank= False)
    marca =models.CharField(max_length=30, null=False, blank= False)
    clase_id = models.CharField(max_length=255, null=False, blank= False)
    clase = models.CharField(max_length=30, null=False, blank= False)
    producto_id = models.CharField(max_length=255, null=False, blank= False)
    clave = models.CharField(max_length=20, null=False, blank= False)
    descripcion = models.CharField(max_length=255, null=False, blank= False)
    unidad = models.CharField(max_length=3, null=False, blank= False)
    factoru = models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    gramos = models.IntegerField(default= 0)
    kxmil = models.CharField(max_length=255, null=False, blank= False)
    calibre = models.IntegerField(default=0)
    caras = models.IntegerField(default=0)
    delinea = models.BooleanField(default=True)
    nacional = models.BooleanField(default=True)
    cantidad =models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    kilos = models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    precio_l =models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    imp_bruto = models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    dscto_esp =models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    precio =models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    importe = models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    dscto =models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    cortes = models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    precio_cortes = models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    imp_neto = models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    costop = models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    costo =models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    descto_costo = models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    rebate = models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    costo_neto = models.DecimalField(default=0.00, max_digits=18, decimal_places=2)
    semana = models.IntegerField(default= 0)
    ejercicio = models.IntegerField(default= 0)
    mes = models.IntegerField(default=0)

    objects = AnalisisVentaManager()

    class Meta:
        managed = True
        db_table = 'analisis_ventas_det'


class SobrePrecioImportacion(models.Model):

    clave = models.CharField(max_length=50, null= False, blank= False)
    porcentaje = models.DecimalField( max_digits=5, decimal_places=2)

    class Meta:
        managed = True
        db_table = 'sobreprecio_importacion'



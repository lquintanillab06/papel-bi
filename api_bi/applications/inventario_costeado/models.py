from django.db import models

# Create your models here.
class Existencia(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    version = models.BigIntegerField()
    #sucursal = models.ForeignKey('Sucursal', models.DO_NOTHING)
    #producto = models.ForeignKey('Producto', models.DO_NOTHING)
    anio = models.BigIntegerField()
    mes = models.BigIntegerField()
    sucursal_nombre = models.CharField(max_length=255, blank=True, null=True)
    clave = models.CharField(max_length=255, blank=True, null=True)
    nacional = models.BooleanField(default= False)
    fecha = models.DateField(blank=True, null=True)
    existencia_inicial = models.DecimalField(max_digits=19, decimal_places=3, blank=True, null=True)
    costo = models.DecimalField(max_digits=19, decimal_places=2, blank=True, null=True)    
    costo_promedio = models.DecimalField(max_digits=19, decimal_places=2, blank=True, null=True)
    cantidad = models.DecimalField(max_digits=19, decimal_places=2)    
    kilos = models.DecimalField(max_digits=19, decimal_places=2)
    recorte_fecha = models.DateField(blank=True, null=True)
    recorte = models.DecimalField(max_digits=19, decimal_places=2, blank=True, null=True)
    recorte_comentario = models.CharField(max_length=255, blank=True, null=True)    
    pedidos_pendiente = models.DecimalField(max_digits=19, decimal_places=2, blank=True, null=True)   
    date_created = models.DateTimeField(blank=True, null=True)
    last_updated = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'existencia'
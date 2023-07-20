from django.db import models



class InventarioCapas(models.Model):

    capa_id = models.CharField(max_length=255, blank=True, null=True)
    proveedor = models.CharField(max_length=255, blank=True, null=True)
    serie = models.CharField(max_length=255, blank=True, null=True)
    folio = models.CharField(max_length=255, blank=True, null=True)
    sub_total = models.DecimalField(max_digits=19, decimal_places=2)
    folio_a = models.CharField(max_length=255, blank=True, null=True)
    fecha_a = models.DateTimeField()
    importe_flete = models.DecimalField(max_digits=19, decimal_places=2)
    cant_a = models.DecimalField(max_digits=19, decimal_places=3)
    costo_unitario = models.DecimalField(max_digits=19, decimal_places=3)
    importe = models.DecimalField(max_digits=19, decimal_places=2)
    inventario_id = models.CharField(max_length=255, blank=True, null=True)
    sucursal = models.CharField(max_length=40, blank=True, null=True)
    fecha = models.DateTimeField()
    #fecha = models.DateField()
    tipo = models.CharField(max_length=255, blank=True, null=True)
    sub_tipo = models.CharField(max_length=255, blank=True, null=True)
    documento = models.BigIntegerField()
    clave = models.CharField(max_length=30, blank=True, null=True)
    descripcion = models.CharField(max_length=600, blank=True, null=True) 
    nacional = models.BooleanField(default= False)
    unidad = models.CharField(max_length=255)
    kilos = models.DecimalField(max_digits=19, decimal_places=3)
    disponible = models.DecimalField(max_digits=19, decimal_places=3)
    disponible_acumulado = models.DecimalField(max_digits=19, decimal_places=3)
    cantidad = models.DecimalField(max_digits=19, decimal_places=2)
    saldo = models.DecimalField(max_digits=19, decimal_places=2)
    #comentario = models.CharField(max_length=255, blank=True, null=True)
    costo = models.DecimalField(max_digits=19, decimal_places=2)
    costo_promedio = models.DecimalField(max_digits=19, decimal_places=2)
    gasto = models.DecimalField(max_digits=19, decimal_places=2, blank=True, null=True)
    cantidad_original = models.DecimalField(max_digits=19, decimal_places=3)
    ejercicio = models.BigIntegerField()
    mes = models.BigIntegerField()
    partidas_idx = models.IntegerField(blank=True, null=True)
    version = models.BigIntegerField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'inventario_capas'
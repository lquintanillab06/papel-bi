from django.db import models
import uuid

# Create your models here.

class ExistenciaBi(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    version = models.IntegerField(default=0, blank= True, null= True)
    mes = models.IntegerField(default= 0, blank= True, null= True)
    ejercicio = models.IntegerField(default= 0, blank= True, null= True)
    sucursal = models.CharField(max_length=50, null= False, blank= False)
    clave = models.CharField(max_length=50, null= False, blank= False)
    producto = models.CharField(max_length=50, null= False, blank= False)
    unidad = models.CharField(max_length=10, null= False, blank= False)
    cantidad = models.DecimalField( max_digits=5, decimal_places=2)
    class Meta:
        managed = False
        db_table = 'existencia_bi'
from django.db import models
import uuid

class Producto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    clave = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=600, blank=True, null=True)
    gramos = models.DecimalField(max_digits=19, decimal_places=2)
    inventariable = models.BooleanField(default=True)


    class Meta:
        managed = True
        db_table = 'producto'

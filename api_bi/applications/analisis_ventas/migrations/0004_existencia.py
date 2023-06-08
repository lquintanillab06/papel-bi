# Generated by Django 3.2 on 2023-05-22 12:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analisis_ventas', '0003_sobreprecioimportacion'),
    ]

    operations = [
        migrations.CreateModel(
            name='Existencia',
            fields=[
                ('id', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('version', models.BigIntegerField()),
                ('anio', models.BigIntegerField()),
                ('mes', models.BigIntegerField()),
                ('sucursal_nombre', models.CharField(blank=True, max_length=255, null=True)),
                ('clave', models.CharField(blank=True, max_length=255, null=True)),
                ('nacional', models.BooleanField(default=False)),
                ('fecha', models.DateField(blank=True, null=True)),
                ('existencia_inicial', models.DecimalField(blank=True, decimal_places=3, max_digits=19, null=True)),
                ('costo', models.DecimalField(blank=True, decimal_places=2, max_digits=19, null=True)),
                ('costo_promedio', models.DecimalField(blank=True, decimal_places=2, max_digits=19, null=True)),
                ('cantidad', models.DecimalField(decimal_places=2, max_digits=19)),
                ('kilos', models.DecimalField(decimal_places=2, max_digits=19)),
                ('recorte_fecha', models.DateField(blank=True, null=True)),
                ('recorte', models.DecimalField(blank=True, decimal_places=2, max_digits=19, null=True)),
                ('recorte_comentario', models.CharField(blank=True, max_length=255, null=True)),
                ('pedidos_pendiente', models.DecimalField(blank=True, decimal_places=2, max_digits=19, null=True)),
                ('date_created', models.DateTimeField(blank=True, null=True)),
                ('last_updated', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'existencia',
                'managed': True,
            },
        ),
    ]
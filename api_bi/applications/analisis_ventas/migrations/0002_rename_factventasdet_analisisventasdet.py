# Generated by Django 3.2 on 2023-05-17 13:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('analisis_ventas', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='FactVentasDet',
            new_name='AnalisisVentasDet',
        ),
    ]
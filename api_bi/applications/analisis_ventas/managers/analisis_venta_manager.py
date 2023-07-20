from django.db import models
from django.db.models import Sum,F,Subquery,Q,OuterRef
from applications.proyeccion_inventario.models import ExistenciaBi




class AnalisisVentaManager(models.Manager):

    def analisis_venta(self,ejercicio,mes,dimension,subdimension,dimension_value,origen,nacional):

        kwargs={
            "ejercicio": ejercicio,
            "mes": mes
        }
        if dimension != subdimension:
            dimension_obj = {
                 dimension : dimension_value
            }
            kwargs.update(dimension_obj)

        if nacional != "":
            importado_obj = {
                 'nacional' : nacional
            }
            kwargs.update(importado_obj)
       
        ventas = (self.filter(**kwargs)
                    .extra(
                        select={
                            'subdimension': subdimension
                        }
                    )
                    .values('subdimension','ejercicio','mes')
                    .order_by(subdimension)
                    .annotate(
                            sum_importe=Sum('importe'),
                            sum_imp_neto=Sum('imp_neto'),
                            sum_costo_neto=Sum('costo_neto'),
                            utilidad=(Sum(F('imp_neto') - F('costo_neto'))),
                            porcentaje_utilidad=((Sum(F('imp_neto') - F('costo_neto'))*100)/Sum('imp_neto')),
                            sum_kilos=Sum('kilos'),  
                            precio_kilo = (Sum('imp_neto')/Sum('kilos')),
                            #porc_participacion_vn = 0 ,                        
                         ))
        #print(ventas.query)

        return ventas


    def analisis_venta_dinamico(self,subdimension, **kwargs):        
        totales = (self.filter(**kwargs)
                   .aggregate(
                        venta_neta = Sum('imp_neto'),
                        utilidad =  Sum(F('imp_neto') - F('costo_neto')),
                        kilos =  Sum('kilos'),
                        costo_neto = Sum('costo_neto')
                   ))
        ventas = (self.filter(**kwargs)
                    .extra(
                        select={
                            'subdimension': subdimension
                        }
                    )
                    .values('subdimension','ejercicio','mes')
                    .order_by(subdimension)
                    .annotate(
                            sum_importe=Sum('importe'),
                            sum_imp_neto=Sum('imp_neto'),
                            sum_costo_neto=Sum('costo_neto'),
                            utilidad=(Sum(F('imp_neto') - F('costo_neto'))),
                            porcentaje_utilidad=((Sum(F('imp_neto') - F('costo_neto'))*100)/Sum('imp_neto')),
                            sum_kilos=Sum('kilos'),  
                            precio_kilo = (Sum('imp_neto')/Sum('kilos')),
                            porc_part_vn = (Sum('imp_neto') * 100) / totales.get('venta_neta'),
                            porc_part_ut = ((Sum(F('imp_neto') - F('costo_neto'))) * 100) / totales.get('utilidad'),
                            
                    ))
        print(ventas.query)
        return ventas, totales.get('venta_neta'), totales.get('kilos'),totales.get('utilidad'),totales.get('costo_neto')
    
    def ventas_dimension(self, **kwargs):
        ventas_id = (self.filter(**kwargs).values('origen_id').distinct())
        ventas = self.filter(origen_id__in = Subquery(ventas_id))
        return ventas
    

    def analisis_proyeccion_costo(self,subdimension, **kwargs): 
        exclude_claves = ['GTOSIMp','PATING','PATINCH','REGALO','ANTICIPO','CHDEV']      
        totales = (self.filter(~Q(linea='CONTABLE'),~Q(clave__in=exclude_claves) ,**kwargs)
                   .aggregate(
                        venta_neta = Sum('imp_neto'),
                        utilidad =  Sum(F('imp_neto') - F('costo_neto')),
                        kilos =  Sum('kilos'),
                        costo_neto = Sum('costo_neto')
                   ))
        ventas = (self.filter(~Q(linea='CONTABLE'), **kwargs)
                    .extra(
                        select={
                            'subdimension': subdimension
                        }
                    )
                    .values('subdimension','ejercicio','mes')
                    .order_by(subdimension)
                    .annotate(
                            sum_importe=Sum('importe'),
                            sum_imp_neto=Sum('imp_neto'),
                            sum_costo_neto=Sum('costo_neto'),
                            sum_descuento = Sum('importe') - Sum('imp_neto') ,
                            sum_descuento_porc= ((Sum('importe') - Sum('imp_neto'))*100)/Sum('importe'),
                            utilidad=(Sum(F('imp_neto') - F('costo_neto'))),
                            porcentaje_utilidad=((Sum(F('imp_neto') - F('costo_neto'))*100)/Sum('imp_neto')),
                            sum_kilos=Sum('kilos'),  
                            precio_kilo = (Sum('imp_neto')/Sum('kilos')),
                            costo_kilo = (Sum('costo_neto')/Sum('kilos')),
                            porc_part_vn = (Sum('imp_neto') * 100) / totales.get('venta_neta'),
                            porc_part_ut = ((Sum(F('imp_neto') - F('costo_neto'))) * 100) / totales.get('utilidad'),
                            porc_part_kilos = (Sum('kilos')*100)/totales.get('kilos')
                            
                    ))
        print(ventas.query)
        return ventas, totales.get('venta_neta'), totales.get('kilos'),totales.get('utilidad'),totales.get('costo_neto')
    

    def analisis_proyeccion_inventario(self,subdimension,mes_exis,ejercicio_exis, **kwargs): 
        exclude_claves = ['GTOSIMp','PATING','PATINCH','REGALO','ANTICIPO','CHDEV'] 

        existencias =   (ExistenciaBi.objects.filter(mes = mes_exis, ejercicio = ejercicio_exis, clave = OuterRef('clave')).values('clave').order_by('clave')
                         .annotate(exis = Sum('cantidad')).values('exis'))
      

        totales = (self.filter(~Q(linea='CONTABLE'),~Q(clave__in=exclude_claves) ,**kwargs)
                   .aggregate(
                        venta_neta = Sum('imp_neto'),
                        utilidad =  Sum(F('imp_neto') - F('costo_neto')),
                        kilos =  Sum('kilos'),
                        costo_neto = Sum('costo_neto')
                   ))
        ventas = (self.filter(~Q(linea='CONTABLE'), **kwargs)
                    .extra(
                        select={
                            'subdimension': subdimension
                        }
                    )
                    .values('subdimension','descripcion','ejercicio','mes')
                    .order_by(subdimension)
                    .annotate(
                        sum_importe=Sum('importe'),
                        sum_imp_neto=Sum('imp_neto'),
                        sum_costo_neto=Sum('costo_neto'),
                        sum_descuento = Sum('importe') - Sum('imp_neto') ,
                        sum_descuento_porc= ((Sum('importe') - Sum('imp_neto'))*100)/Sum('importe'),
                        utilidad=(Sum(F('imp_neto') - F('costo_neto'))),
                        porcentaje_utilidad=((Sum(F('imp_neto') - F('costo_neto'))*100)/Sum('imp_neto')),
                        sum_kilos=Sum('kilos'),  
                        sum_cantidad = Sum('cantidad'),
                        precio_kilo = (Sum('imp_neto')/Sum('kilos')),
                        costo_kilo = (Sum('costo_neto')/Sum('kilos')),
                        porc_part_vn = (Sum('imp_neto') * 100) / totales.get('venta_neta'),
                        porc_part_ut = ((Sum(F('imp_neto') - F('costo_neto'))) * 100) / totales.get('utilidad'),
                        porc_part_kilos = (Sum('kilos')*100)/totales.get('kilos'),
                        sum_precio_venta =Sum('imp_neto') / Sum('cantidad'),
                        sum_costo_venta = Sum('costo_neto') / Sum('cantidad'),
                        kilos_millar = F('kxmil')
                        ).annotate(existencia = Subquery(existencias))

                    )
       
        #print(ventas.query)
        #print(ventas)
        #print("Ya pase")
        return ventas, totales.get('venta_neta'), totales.get('kilos'),totales.get('utilidad'),totales.get('costo_neto')
     
    
    
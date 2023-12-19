from django.db import models
from django.db.models import Sum,F,Subquery,Q,OuterRef,Max,Min
from applications.proyeccion_inventario.models import ExistenciaBi
import pandas as pd





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
        dimension =  subdimension   
        if(subdimension == 'clave'):
            dimension= "Concat(descripcion,'  ','(',clave,')' )"

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
                            'subdimension': subdimension,
                            'descripcion': dimension
                        }
                    )
                    .values('subdimension','descripcion','ejercicio','mes')
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
                    )
                    )
        # print(ventas.query)
        return ventas, totales.get('venta_neta'), totales.get('kilos'),totales.get('utilidad'),totales.get('costo_neto')
    
    def ventas_dimension(self, **kwargs):
        ventas_id = (self.filter(**kwargs).values('origen_id').distinct())
        ventas = self.filter(origen_id__in = Subquery(ventas_id))
        return ventas
    

    def analisis_proyeccion_costo(self,subdimension, **kwargs): 
        
        dimension =  subdimension   
        if(subdimension == 'clave'):
            dimension= "Concat(descripcion,'  ','(',clave,')' )"

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
                            'subdimension': subdimension,
                            'descripcion': dimension
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
                            precio_kilo = (Sum('imp_neto')/Sum('kilos')),
                            costo_kilo = (Sum('costo_neto')/Sum('kilos')),
                            porc_part_vn = (Sum('imp_neto') * 100) / totales.get('venta_neta'),
                            porc_part_ut = ((Sum(F('imp_neto') - F('costo_neto'))) * 100) / totales.get('utilidad'),
                            porc_part_kilos = (Sum('kilos')*100)/totales.get('kilos')  
                    ))
        print(ventas.query)
        return ventas, totales.get('venta_neta'), totales.get('kilos'),totales.get('utilidad'),totales.get('costo_neto')
    

    def analisis_proyeccion_inventario(self,subdimension,mes_exis,ejercicio_exis, **kwargs): 
        dimension= "Concat(descripcion,'  ','(',clave,')' )"
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
                            'subdimension': dimension
                        }
                    )
                    .values('subdimension','ejercicio','mes','linea','clase','marca')
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
     

    def analisis_proyeccion_costo_acumulado(self,subdimension,mes,**kwargs): 
        dimension =  subdimension   
        if(subdimension == 'clave'):
            dimension= "Concat(descripcion,'  ','(',clave,')' )"

        exclude_claves = ['GTOSIMp','PATING','PATINCH','REGALO','ANTICIPO','CHDEV']      
        totales = (self.filter(~Q(linea='CONTABLE'),~Q(clave__in=exclude_claves), mes__range = (1,mes) ,**kwargs)
                   .aggregate(
                        venta_neta = Sum('imp_neto'),
                        utilidad =  Sum(F('imp_neto') - F('costo_neto')),
                        kilos =  Sum('kilos'),
                        costo_neto = Sum('costo_neto')
                   ))
        ventas = (self.filter(~Q(linea='CONTABLE'), mes__range = (1,mes), **kwargs)
                    .extra(
                        select={
                            'subdimension': subdimension,
                            'descripcion': dimension
                        }
                    )
                    .values('subdimension','descripcion','ejercicio')
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
        # print(ventas.query)
        return ventas, totales.get('venta_neta'), totales.get('kilos'),totales.get('utilidad'),totales.get('costo_neto')
    

    def analisis_proyeccion_inventario_acumulado(self,subdimension,mes_exis,ejercicio_exis,mes, **kwargs): 
        
        dimension= "Concat(descripcion,'  ','(',clave,')' )"
        exclude_claves = ['GTOSIMp','PATING','PATINCH','REGALO','ANTICIPO','CHDEV'] 

        existencias =   (ExistenciaBi.objects.filter(mes = mes_exis, ejercicio = ejercicio_exis, clave = OuterRef('clave')).values('clave').order_by('clave')
                         .annotate(exis = Sum('cantidad')).values('exis'))
      

        totales = (self.filter(~Q(linea='CONTABLE'),~Q(clave__in=exclude_claves), mes__range = (1,mes) ,**kwargs)
                   .aggregate(
                        venta_neta = Sum('imp_neto'),
                        utilidad =  Sum(F('imp_neto') - F('costo_neto')),
                        kilos =  Sum('kilos'),
                        costo_neto = Sum('costo_neto')
                   ))
        ventas = (self.filter(~Q(linea='CONTABLE'), mes__range = (1,mes), **kwargs)
                    .extra(
                        select={
                            'subdimension': dimension,
                        }
                    )
                    .values('subdimension','ejercicio','linea','clase','marca')
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
        return ventas, totales.get('venta_neta'), totales.get('kilos'),totales.get('utilidad'),totales.get('costo_neto')
    
    
    def comparativo_ventas(self,dimension,mes_ini1,mes_fin1,ejercicio1, mes_ini2, mes_fin2, ejercicio2):
        ventas1 = (self.filter(~Q(linea='CONTABLE'), mes__range = (mes_ini1,mes_fin1), ejercicio = ejercicio1)
                    .extra(
                        select={
                            'dimension': dimension
                        }
                    )
                    .values('dimension','ejercicio')
                    .order_by(dimension)
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
                        sum_precio_venta =Sum('imp_neto') / Sum('cantidad'),
                        sum_costo_venta = Sum('costo_neto') / Sum('cantidad'),
                        mes_i = Min('mes'),
                        mes_f= Max('mes')
                        )
        )

        ventas2 = (self.filter(~Q(linea='CONTABLE'), mes__range = (mes_ini2,mes_fin2), ejercicio = ejercicio2)
                    .extra(
                        select={
                            'dimension': dimension
                        }
                    )
                    .values('dimension','ejercicio')
                    .order_by(dimension)
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
                        sum_precio_venta =Sum('imp_neto') / Sum('cantidad'),
                        sum_costo_venta = Sum('costo_neto') / Sum('cantidad'),
                        mes_i = Min('mes'),
                        mes_f = Max('mes')
                        
                        )
        )
               
        df1 = pd.DataFrame(ventas1)
        df2 = pd.DataFrame(ventas2)
        df_union = pd.merge( df2,df1, on='dimension', how='outer')
        df_union['ejercicio_x'] = df_union['ejercicio_x'].fillna(ejercicio2)
        df_union['ejercicio_y'] = df_union['ejercicio_y'].fillna(ejercicio1)
        df_union.fillna(0, inplace=True)
        df_union['diferencia_toneladas'] = df_union['sum_kilos_y'] - df_union['sum_kilos_x']
        df_union['diferencia_ventas'] = df_union['sum_imp_neto_y'] - df_union['sum_imp_neto_x']
        df_union['diferencia_margen'] = df_union['utilidad_y'] - df_union['utilidad_x']
        df_union['diferencia_porcentaje_margen'] = df_union['porcentaje_utilidad_y'] - df_union['porcentaje_utilidad_x'] 
        df_union['diferencia_precio_kilo'] = df_union['precio_kilo_y'] - df_union['precio_kilo_x']
 
        ventas = df_union.to_dict(orient='records')

        for venta in ventas:
            print("*"*50)
            print(venta)

        return ventas

         
    
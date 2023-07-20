from django.db import models
from django.db.models import Sum,F,Subquery,OuterRef


class InventarioCapasManager(models.Managers):
    
    def inventario_capas_costo(self,subdimension, **kwargs):        
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
    

    
    
from ..reports.report_pdf import ReportPDF
from ..reports.report_dao import ReportDao



def mejores_clientes(fecha_ini,fecha_fin,origen,no_clientes):

    print("Ejecutando mejores clientes")
    query = """
            select a.cliente_id
            ,a.cliente nombre
            ,sum(imp_neto) as neto
            ,sum(a.kilos) as kilos
            ,MAX(a.fecha) AS ULT_VTA
            from analisis_ventas_det a
            where a.fecha between %s and %s AND a.cliente_id<>'402880fc5e4ec411015e4ecc5dfc0554'
            AND (CASE WHEN a.origen='CRE' THEN 'CREDITO' ELSE 'CONTADO' END) LIKE %s
            group by a.cliente_id,a.cliente
            order by (sum(a.imp_neto)) desc
            limit %s
        """

    # Parametros 
    dao = ReportDao()
    data = dao.get_data(query,[fecha_ini,fecha_fin,origen,no_clientes])


    periodo =f"PERIODO : {fecha_ini} A {fecha_fin}"


    pdf = ReportPDF('P','mm','Letter','PAPEL S.A. DE C.V',f"{no_clientes} Mejores Clientes", fecha=periodo)
  
    pdf.add_page()
    pdf.set_font('helvetica', 'B', 10)

    #Encabezado reporte
    pdf.set_y(27)
    pdf.cell(70, 5,'CLIENTE',align="C")
    pdf.cell(30, 5, 'NETO',align="C")
    pdf.cell(30, 5, 'KILOS',align="C", new_x="LMARGIN", new_y="NEXT")

    
    current_y = pdf.get_y()
    pdf.line(10,current_y,205,current_y)

    for cliente in data:
        pdf.multi_cell(70, 5, cliente['nombre'],align="L", new_y="LAST")
        pdf.cell(30, 5,str(cliente['neto']),align="C")
        pdf.cell(30, 5,str(cliente['kilos']),align="C")
        pdf.cell(0,5,"", new_x="LMARGIN", new_y="NEXT")
    
    current_y = pdf.get_y()
    pdf.line(10,current_y,205,current_y)

    reporte = bytes(pdf.output())
    return reporte
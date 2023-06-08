import React, {useMemo} from 'react';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import Typography from '@mui/material/Typography';

const TableDetailVentas = ({datos, loading}) => {

    
    const columns=useMemo(()=>[
        { 
            accessorKey: 'origen_id',
             header: 'ID',
             size:20,
             maxSize:20,
             
        },
        { 
            accessorKey: 'tipo', 
            header: 'Tipo',
            aggregationFn: 'max', 
            AggregatedCell: ({ cell }) => <div>{cell.getValue()}</div>,
            size:40,
            maxSize:40, 

        },
        { 
            accessorKey: 'cliente', 
            header: 'Cliente',
            aggregationFn: 'max', 
            AggregatedCell: ({ cell }) => <div>{cell.getValue()}</div>,
            size:40,
            maxSize:40, 

        },
        { 
            accessorKey: 'docto',
             header: 'Documento',
             size:40,
             maxSize:40,
             aggregationFn: 'max', 
             AggregatedCell: ({ cell }) => <div>{cell.getValue()}</div>,
         },
        {
            accessorKey:'fecha',
            header:'Fecha',
            aggregationFn: 'max',
            AggregatedCell: ({ cell }) => <div>{cell.getValue()}</div>,
            size:30,
            maxSize:30,
        },
        {
            accessorKey:'origen',
            header:'Venta',
            aggregationFn: 'max',
            AggregatedCell: ({ cell }) => <div>{cell.getValue()}</div>,
            size:30,
            maxSize:30,
        },
        {
            accessorKey:'suc',
            header:'Sucursal',
            aggregationFn: 'max',
            AggregatedCell: ({ cell }) => <div>{cell.getValue()}</div>,
            size:30,
            maxSize:30,
        },
        { 
            accessorKey: 'clave',
             header: 'Clave',
             size:30,
             maxSize:30
         },
        { 
            accessorKey: 'imp_neto', 
            header: 'Importe Neto',
            aggregationFn: 'sum', 
            AggregatedCell: ({ cell }) => <div>{Number(cell.getValue().toFixed(2))}</div>,
            size:30 ,
            maxSize:30
        },
        {
            accessorKey:'kilos',
            header:'Kilos',
            aggregationFn: 'sum',
            AggregatedCell: ({ cell }) => <div>{Number(cell.getValue().toFixed(2))}</div>,
            size:30,
            maxSize:30,
        },
        {
            accessorFn: (row) => {
                console.log(row.getParentRow)
                if (row.kilos){
                    return Number((row.imp_neto / row.kilos).toFixed(2))
                }
                else{
                    return 0
                }
            },
            aggregationFn: 'sum',
            //AggregatedCell: ({ row,cell }) => <div>{Number(cell.getValue().toFixed(2))}</div>,
            id: 'precio_kilo',
            header: 'Precio kilo',
            size:50,
            maxSize:50,
        },
        {
            accessorKey:'costo',
            header:'Costo',
            aggregationFn: 'sum',
            AggregatedCell: ({ cell }) => <div>{Number(cell.getValue().toFixed(2))}</div>,
            size:50,
            maxSize:50,
        },

    ])

    return (
        <div>
             <MaterialReactTable
                columns={columns}
                data={datos}
                enableDensityToggle={false}
                enableColumnOrdering
                enableGlobalFilter={false}
                enablePinning
                state={{ isLoading: loading }}
                initialState={{ 
                    grouping: ['origen_id'],
                    density: 'compact',
                    size:'small',
                    columnVisibility: { origen_id: false } ,
                    columnPinning: { left: ['cliente'] }
                }} 
                enableGrouping
                displayColumnDefOptions={{
                    'mrt-row-expand': {
                        size: 5, //set custom width
                        maxSize:5,
                        enablePinning: true,
                    },
                  }}
          
                enableStickyHeader
                enablePagination={false}
                enableRowVirtualization 
                enableBottomToolbar={false}
                muiTableContainerProps={{ sx: { maxHeight: '80vh' , minHeight: '80vh'} }}
                muiTableBodyRowProps={({row})=>{
                    if(!row.getIsGrouped()){
                        return {
                            sx:{
                                backgroundColor:'#e5f6fd',
                                border: 'none'
                            }
                        }
                    } 
                }}
             />    
        </div>
    );
}

export default TableDetailVentas;

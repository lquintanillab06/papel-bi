import React,{useMemo, useState} from 'react';
import MaterialReactTable from 'material-react-table';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import styled from "styled-components";
import axios from 'axios';
import { formatAsPercentage } from '../../../helpers/number_utils';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { apiUrl } from '../../../conf/axiosInstance';


const ContenedorTable = styled.div`
 width:100%;
 height:100%;
`;

const ContenedorHeader = styled.div`
 width:100%;
 height:100%;

 display:flex;
 justify-content: space-between;
`;

const ContenedorTitle = styled.div`
  width: 25%;
`;
const ContenedorBreadcrumbs = styled.div`
  width: 50%;
`;
const ContenedorSelector = styled.div`
width: 25%;
display:flex;
gap:5px
;
`;

 const ProyeccionInventarioTable = ({datos,setData,loading,setLoading,parametrosTable,setParametrosTable,
                                 setTotales}) => {

      const [seleccionTable, setSeleccionTable] = useState();
      const [openDialog, setOpenDialog] = useState(false);
      const [valueQuery, setValueQuery] = useState('')

      const columns=useMemo(()=>[
          //{ accessorKey: 'subdimension', header: 'Descripcion',size:200 },
          { accessorKey: 'subdimension',
          header: 'Descripcion',
          size:250,
          Cell: ({ row }) => (` ( ${row.original.subdimension} ) -- ${row.original.descripcion}`)
        },
          { accessorKey: 'sum_importe',
           header: 'Importe' ,
           size:100,
           Cell: ({ cell }) => (cell.getValue()?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }))
          },
          { accessorKey: 'sum_descuento',
           header: 'Descuento' ,
           size:100,
           Cell: ({ cell }) => (cell.getValue()?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }))
          },
          { accessorKey: 'sum_descuento_porc',
          header: '%Desc.',
          size:100,
          Cell: ({ cell }) => (
           <Box
             component="span"
           >
             {formatAsPercentage(cell.getValue())}
           </Box>
         )
          },
          { accessorKey: 'sum_imp_neto',
           header: 'Importe Neto',
           size:110,
           Cell: ({ cell }) => (cell.getValue()?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }))
          },
         { accessorKey: 'precio_kilo',
          header: 'Precio Kilo',
          size: 100,
          Cell: ({ cell }) => (cell.getValue()?.toLocaleString?.('en-US', {
           style: 'currency',
           currency: 'USD',
           minimumFractionDigits: 0,
           maximumFractionDigits: 0,
         }))
        },
         { accessorKey: 'porc_part_vn',
          header: 'Part Venta',
          size:100,
          Cell: ({ cell }) => (
           <Box
             component="span"
             sx={(theme) => ({
               color:
                 cell.getValue() < 0
                   && theme.palette.error.dark,
             })}
           >
             {formatAsPercentage(cell.getValue())}
           </Box>
         )
          },
          { accessorKey: 'sum_costo_neto',
           header: 'Costo Neto',
           size:100,
           Cell: ({ cell }) => (cell.getValue()?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })) 
          },
          { accessorKey: 'costo_kilo',
          header: 'Costo Kilo',
          size:100,
          Cell: ({ cell }) => (cell.getValue()?.toLocaleString?.('en-US', {
           style: 'currency',
           currency: 'USD',
           minimumFractionDigits: 0,
           maximumFractionDigits: 0,
         }))
        },
          { accessorKey: 'utilidad',
           header: 'Utilidad',
           size:100,
          Cell: ({ cell }) => (
            <Box
              component="span"
              sx={(theme) => ({
                color:
                  cell.getValue() < 0
                    && theme.palette.error.dark,
              })}
            >
              {cell.getValue()?.toLocaleString?.('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Box>
          )
         },
         { accessorKey: 'porcentaje_utilidad',
         header: '% Utilidad' ,
         size:100,
         Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              color:
                cell.getValue() < 0
                  && theme.palette.error.dark,
            })}
          >
            {formatAsPercentage(cell.getValue())}
          </Box>
        )
        },
          { accessorKey: 'porc_part_ut',
           header: 'Part Utilidad',
           size:100,
           Cell: ({ cell }) => (
            <Box
              component="span"
              sx={(theme) => ({
                color:
                  cell.getValue() < 0
                    && theme.palette.error.dark,
              })}
            >
              {formatAsPercentage(cell.getValue())}
            </Box>
          )
           },
           { accessorKey: 'sum_kilos',
           header: 'Kilos',
           size:100,
           Cell: ({ cell }) => (cell.getValue()?.toLocaleString?.('en-US', {
             minimumFractionDigits: 0,
             maximumFractionDigits: 0,
           }))
         },
         { accessorKey: 'porc_part_kilos',
          header: 'Part. Kilos',
          size:100,
          Cell: ({ cell }) => (
           <Box
             component="span"
           >
             {formatAsPercentage(cell.getValue())}
           </Box>
         )
          },
           { accessorKey: 'sum_cantidad',
           header: 'Cantidad',
           size:100,
           Cell: ({ cell }) => (cell.getValue()?.toLocaleString?.('en-US', {
             minimumFractionDigits: 3,
             maximumFractionDigits: 3,
           }))
         },
         { accessorKey: 'sum_precio_venta',
           header: 'Precio Venta',
           size:100,
           Cell: ({ cell }) => (cell.getValue()?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
           }))
         },
         { accessorKey: 'sum_costo_venta',
           header: 'Costo Venta',
           size:100,
           Cell: ({ cell }) => (cell.getValue()?.toLocaleString?.('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
           }))
         },
         { accessorKey: 'existencia',
           header: 'Existencia',
           size:100,
           Cell: ({ cell }) => (cell.getValue()?.toLocaleString?.('en-US', {
             minimumFractionDigits: 3,
             maximumFractionDigits: 3,
           }))
         },
         { accessorKey: 'alcance',
           header: 'Alcance',
           size:100,
           Cell: ({ row }) => ((row.original.existencia / row.original.sum_cantidad).toLocaleString?.('en-US', {
             minimumFractionDigits: 3,
             maximumFractionDigits: 3,
           }))
         },
         { accessorKey: 'existencia_kilos',
           header: 'Ex. Kilos',
           size:100,
           Cell: ({ row }) => ((row.original.existencia * row.original.kilos_millar).toLocaleString?.('en-US', {
             minimumFractionDigits: 0,
             maximumFractionDigits: 0,
           }))
         },
         { accessorKey: 'existencia_venta_neta',
           header: 'Ex. Vta Neta',
           size:110,
           Cell: ({ row }) => ((row.original.existencia * row.original.sum_precio_venta).toLocaleString?.('en-US', {
             minimumFractionDigits: 0,
             maximumFractionDigits: 0,
           }))
         },
         { accessorKey: 'existencia_costo_venta',
           header: 'Ex Costo Vta',
           size:110,
           Cell: ({ row }) => ((row.original.existencia * row.original.sum_costo_venta).toLocaleString?.('en-US', {
             minimumFractionDigits: 0,
             maximumFractionDigits: 0,
           }))
         },
         { accessorKey: 'existencia_utilidad',
         header: 'Ex Utilidad',
         size:110,
         Cell: ({ row }) => (((row.original.existencia * row.original.sum_precio_venta) - (row.original.existencia * row.original.sum_costo_venta)).toLocaleString?.('en-US', {
           minimumFractionDigits: 0,
           maximumFractionDigits: 0,
         }))
       },
          { accessorKey: 'ejercicio',
           enablePinning: false, header: 'Ejercicio', size:100
           },
          { accessorKey: 'mes', enablePinning: false, header: 'Mes', size:100,},
          { accessorKey: 'kilos_millar',
           header: 'KXMil',
           size:100,
           Cell: ({ cell }) => (cell.getValue()?.toLocaleString?.('en-US', {
             minimumFractionDigits: 0,
             maximumFractionDigits: 0,
           }))
         },
  
      ],
      [],) 


      const getData = async() =>{
        setLoading(true)
         const datos = await axios({
            method: 'post',
            url: `${apiUrl.url}inventario/proyeccion_inventario/`,
            data: parametrosTable
          });
        setData(datos.data.data)
        setTotales(datos.data.totales)
        setLoading(false)
    } 

    const openTableDialog = (dimension) =>{
        setOpenDialog(true) 
        setValueQuery(dimension)
    }

      return (

           

          <ContenedorTable>
            <MaterialReactTable
                columns={columns}
                data={datos}
                enableDensityToggle={false}
                enableColumnOrdering
                enableGlobalFilter={false} 
                enablePinning
                initialState={{ 
                  columnPinning: { left: ['subdimension'] },
                  density: 'compact',
                   size:'small',
                   
                }} 
                muiTableBodyRowProps={({ row }) => ({
                    onDoubleClick:()=>{
                    
                    }
                    ,
                    sx: {
                    cursor: 'pointer', 
                    },
                })}
                state={{ isLoading: loading }}
                enableStickyHeader
                renderTopToolbarCustomActions={({ table }) => (
                  <ContenedorHeader>
                    <ContenedorTitle>
                      <Box >
                          <Typography
                              variant="h4"
                              component="div"
                              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                              >
                              Proyeccion Inventario
                          </Typography>
                      </Box>
                      </ContenedorTitle>
                      <ContenedorBreadcrumbs>
                      </ContenedorBreadcrumbs>
                  </ContenedorHeader>
                  )}
                  //enableRowNumbers 
                  enablePagination={false}
                  enableRowVirtualization 
                  enableBottomToolbar={false}
                  rowNumberMode="static"
                  mantineTableProps={{
                    sx: {
                      tableLayout: 'fixed',
                    },
                  }}
                  muiTableContainerProps={{ sx: { maxHeight: '80vh' , minHeight: '80vh'} }}
                  localization={MRT_Localization_ES}
            /> 
             
        </ContenedorTable>
      );
}

export default ProyeccionInventarioTable;


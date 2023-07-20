import React,{useMemo, useState, useEffect} from 'react';
import MaterialReactTable from 'material-react-table';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Breadcrumbs from '@mui/material/Breadcrumbs';
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

const dimensionesSelector = [
  {key:'clave',dimension:'PRODUCTO'},
  {key:'cliente',dimension:'CLIENTE'},
  {key:'suc',dimension:'SUCURSAL'},
  {key:'origen',dimension:'VENTA'},
  {key:'linea',dimension:'LINEA'},
  {key:'mes',dimension:'MES'},
]

 const ProyeccionCostoTable = ({datos,setData,loading,setLoading,parametrosTable,setParametrosTable, dimensiones,
                                 setDimensiones,setTotales}) => {

      const [seleccionTable, setSeleccionTable] = useState();
      const [openDialog, setOpenDialog] = useState(false);
      const [valueQuery, setValueQuery] = useState('')


    

      const columns=useMemo(()=>[
          { accessorKey: 'subdimension', header: 'Descripcion',size:200 },
          { 
            accessorKey: 'acciones',
            header: '→',
            maxSize:50,
            enableSorting:false,
            enableColumnActions: false,
            enableColumnOrdering:false,
            Cell: ({ cell }) => (
              <Box component="span">
                <IconButton color="primary" aria-label="open dialog" onClick={()=>{openTableDialog(cell.row.original.subdimension)}}>
                    <DynamicFeedIcon />
                </IconButton>
              </Box>
            )
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
          { accessorKey: 'ejercicio',
           enablePinning: false, header: 'Ejercicio', size:100
           },
          { accessorKey: 'mes', enablePinning: false, header: 'Mes', size:100,},
  
      ],
      [],) 

      const handleChangeSelector = (e) =>{
          console.log(e.target.value)
          setSeleccionTable(e.target.value)
          setParametrosTable({...parametrosTable,subdimension:e.target.value})
      }

      const handleDoubleClick = (row) =>{
        console.log("haciendo doble click")
        console.info(row.original.subdimension);
        const {subdimension} = parametrosTable
        setParametrosTable({...parametrosTable,[subdimension]:row.original.subdimension,subdimension:seleccionTable})
        setDimensiones([...dimensiones, row.original.subdimension ])
      }

      const ejecutar = ()=>{
        console.log(parametrosTable)
        if(parametrosTable.ejercicio  && parametrosTable.mes && parametrosTable.subdimension){
          getData()
        }
      }

      const getData = async() =>{
        setLoading(true)
         const datos = await axios({
            method: 'post',
            url: `${apiUrl.url}costo/proyeccion_costo/`,
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
                      handleDoubleClick(row)
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
                              Analisis Costo
                          </Typography>
                      </Box>
                      </ContenedorTitle>
                      <ContenedorBreadcrumbs>
                            <Breadcrumbs aria-label="breadcrumb">
                             {dimensiones&&
                              dimensiones.map((dimension)=>
                              <Typography color="text.primary" key={dimension}>{dimension.toUpperCase()}</Typography>
                              )
                             }
                            </Breadcrumbs>
                      </ContenedorBreadcrumbs>
                      <ContenedorSelector>
                      <FormControl fullWidth size="small">
                            <InputLabel id="dimensiones-label">SubDimension</InputLabel>
                            <Select
                                labelId="dimensiones-label"
                                id="dimensiones-select"
                                label="SubDimension"
                                onChange={handleChangeSelector}
                                defaultValue="" 
                                name='subdimension'
                            >
                                {dimensionesSelector.map(dimension => <MenuItem key={dimension.key} value={dimension.key}>{dimension.dimension}</MenuItem>)}
                            </Select>
                        </FormControl>
                          <Button 
                            onClick={ejecutar} 
                            variant="contained"
                            size="small"
                        
                          >
                            <ArrowForwardIcon />
                          </Button>
                      </ContenedorSelector>
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

export default ProyeccionCostoTable;


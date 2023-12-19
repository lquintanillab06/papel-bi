import React,{useMemo, useState, useEffect} from 'react';
import MaterialReactTable from 'material-react-table';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import IconButton from '@mui/material/IconButton';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import styled from "styled-components";
import axios from 'axios';
import {formatAsPercentage} from '../../../../helpers/number_utils';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { apiUrl } from '../../../../conf/axiosInstance';


const ContenedorTable = styled.div`
 width:80%;
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

const TableComparativo = ({datos, loading,parametrosTable}) => {

    const columns=useMemo(()=>[
        { accessorKey: 'dimension', header: 'Descripcion',size:250},
        {
            columns:[{
                accessorKey: 'sum_kilos_y',
                header: parametrosTable.ejercicio1 == parametrosTable.ejercicio2 && parametrosTable.ejercicio1
                        ? (parametrosTable.mes_ini1 == parametrosTable.mes_fin1 
                            ? `Mes: ${parametrosTable.mes_ini1}` 
                            : `De ${parametrosTable.mes_ini1} A ${parametrosTable.mes_fin1} `) 
                        : parametrosTable.ejercicio1
              },
              {
                accessorKey: 'sum_kilos_x',
                header: parametrosTable.ejercicio2 == parametrosTable.ejercicio1  && parametrosTable.ejercicio2
                        ? (parametrosTable.mes_ini2 == parametrosTable.mes_fin2 
                            ? `Mes: ${parametrosTable.mes_ini2}` 
                            : `De ${parametrosTable.mes_ini2} A ${parametrosTable.mes_fin2} `) 
                        : parametrosTable.ejercicio2
              },
              { accessorKey: 'diferencia_toneladas', 
              header: 'Diferencia',
              size:100,
              Cell: ({ row }) => (
                <Box
                  component="span"
                  sx={(theme) => ({
                    color:
                        (row.original.diferencia_toneladas) < 0
                        && theme.palette.error.dark,
                  })}
                >
                  {(row.original.diferencia_toneladas).toLocaleString?.('en-US', {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                    })}
                </Box>
              )
              },
            ],
            header: 'Toneladas',
            id: 'toneladas' 
        },
        {
            columns:[{
                accessorKey: 'sum_imp_neto_y',
                header: parametrosTable.ejercicio1 == parametrosTable.ejercicio2  && parametrosTable.ejercicio1
                        ? (parametrosTable.mes_ini1 == parametrosTable.mes_fin1 
                            ? `Mes: ${parametrosTable.mes_ini1}` 
                            : `De ${parametrosTable.mes_ini1} A ${parametrosTable.mes_fin1} `) 
                        : parametrosTable.ejercicio1
              },
              {
                accessorKey: 'sum_imp_neto_x',
                header: parametrosTable.ejercicio2 == parametrosTable.ejercicio1  && parametrosTable.ejercicio2
                        ? (parametrosTable.mes_ini2 == parametrosTable.mes_fin2 
                            ? `Mes: ${parametrosTable.mes_ini2}` 
                            : `De ${parametrosTable.mes_ini2} A ${parametrosTable.mes_fin2} `) 
                        : parametrosTable.ejercicio2
              },
              { accessorKey: 'diferencia_ventas',
                header: 'Diferencia',
                size:100,
                Cell: ({ row }) => (
                    <Box
                      component="span"
                      sx={(theme) => ({
                        color:
                            (row.original.diferencia_ventas) < 0
                            && theme.palette.error.dark,
                      })}
                    >
                      {(row.original.diferencia_ventas).toLocaleString?.('en-US', {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                        })}
                    </Box>
                  )
                },
            ],
            header: 'Ventas',
            id: 'ventas' 
        },
        {
            columns:[{
                accessorKey: 'utilidad_y',
                header: parametrosTable.ejercicio1 == parametrosTable.ejercicio2  && parametrosTable.ejercicio1
                ? (parametrosTable.mes_ini1 == parametrosTable.mes_fin1 
                    ? `Mes: ${parametrosTable.mes_ini1}` 
                    : `De${parametrosTable.mes_ini1} A ${parametrosTable.mes_fin1} `) 
                : parametrosTable.ejercicio1
              },
              {
                accessorKey: 'utilidad_x',
                header: parametrosTable.ejercicio2 == parametrosTable.ejercicio1  && parametrosTable.ejercicio2
                        ? (parametrosTable.mes_ini2 == parametrosTable.mes_fin2 
                            ? `Mes: ${parametrosTable.mes_ini2}` 
                            : `De ${parametrosTable.mes_ini2} A ${parametrosTable.mes_fin2} `) 
                        : parametrosTable.ejercicio2
              },
              { accessorKey: 'diferencia_margen',
              header: 'Diferencia',
              size:100,
              Cell: ({ row }) => (
                <Box
                  component="span"
                  sx={(theme) => ({
                    color:
                        (row.original.diferencia_margen) < 0
                        && theme.palette.error.dark,
                  })}
                >
                  {(row.original.diferencia_margen).toLocaleString?.('en-US', {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                    })}
                </Box>
              )
              },
            ],
            header: '$ Margen',
            id: 'margen' 
        },
        {
            columns:[{
                accessorKey: 'porcentaje_utilidad_y',
                header: parametrosTable.ejercicio1 == parametrosTable.ejercicio2  && parametrosTable.ejercicio1
                        ? (parametrosTable.mes_ini1 == parametrosTable.mes_fin1 
                            ? `Mes: ${parametrosTable.mes_ini1}` 
                            : `De${parametrosTable.mes_ini1} A ${parametrosTable.mes_fin1} `) 
                        : parametrosTable.ejercicio1
              },
              {
                accessorKey: 'porcentaje_utilidad_x',
                header: parametrosTable.ejercicio2 == parametrosTable.ejercicio1  && parametrosTable.ejercicio2
                        ? (parametrosTable.mes_ini2 == parametrosTable.mes_fin2 
                            ? `Mes: ${parametrosTable.mes_ini2}` 
                            : `De${parametrosTable.mes_ini2} A ${parametrosTable.mes_fin2} `) 
                        : parametrosTable.ejercicio2
              },
              { accessorKey: 'diferencia_porcentaje_margen',
              header: 'Diferencia',
              size:100,
              Cell: ({ row }) => (
                <Box
                  component="span"
                  sx={(theme) => ({
                    color:
                        (row.original.diferencia_porcentaje_margen) < 0
                        && theme.palette.error.dark,
                  })}
                >
                  {(row.original.diferencia_porcentaje_margen).toLocaleString?.('en-US', {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                    })}
                </Box>
              )
              },
            ],
            header: '% Margen',
            id: 'porcentajeMargen' 
        },
         {
            columns:[{
                accessorKey: 'precio_kilo_y',
                header: parametrosTable.ejercicio1 == parametrosTable.ejercicio2  && parametrosTable.ejercicio1
                        ? (parametrosTable.mes_ini1 == parametrosTable.mes_fin1 
                            ? `Mes: ${parametrosTable.mes_ini1}` 
                            : `Mes: De${parametrosTable.mes_ini1} A ${parametrosTable.mes_fin1} `) 
                        : parametrosTable.ejercicio1
              },
              {
                accessorKey: 'precio_kilo_x',
                header: parametrosTable.ejercicio2 == parametrosTable.ejercicio1  && parametrosTable.ejercicio2
                        ? (parametrosTable.mes_ini2 == parametrosTable.mes_fin2 
                            ? `Mes: ${parametrosTable.mes_ini2}` 
                            : `Mes: De${parametrosTable.mes_ini2} A ${parametrosTable.mes_fin2} `) 
                        : parametrosTable.ejercicio2
              },
              { accessorKey: 'diferencia_precio_kilo',
              header: 'Diferencia',
              size:100,
              Cell: ({ row }) => (
                <Box
                  component="span"
                  sx={(theme) => ({
                    color:
                        (row.original.diferencia_precio_kilo) < 0
                        && theme.palette.error.dark,
                  })}
                >
                  {(row.original.diferencia_precio_kilo).toLocaleString?.('en-US', {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                    })}
                </Box>
              )
              },
            ],
            header: 'Precio por Kilo',
            id: 'precioKilo' 
        }, 
    ])

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
                  columnPinning: { left: ['dimension'] },
                  columnVisibility:{subdimension:false},
                  density: 'compact',
                   size:'small'
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
                              color={'success'}
                              >
                              Comparativo Ventas 
                          </Typography>
                      </Box>
                      </ContenedorTitle>
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

export default TableComparativo;

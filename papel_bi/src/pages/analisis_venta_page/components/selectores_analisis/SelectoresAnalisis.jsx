import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {getLastFiveYears, getCurrentYear, getCurrentMonth, getMonths } from '../../../../helpers/date_utils'

import './SelectoresAnalisis.css'


const cardSelectorsStyles = {

    width:'90%',
    height:'50%',
    backgroundColor: 'light-gray'

}

const cardStyles = {

    width:'90%',
    height:'45%',
    backgroundColor: 'light-gray'

}


const SelectoresAnalisis = ({setParametros, parametros, getData, totales}) => {

    console.log(totales);

    const [seleccion, setSeleccion] = useState({
        ejercicio: null,
        mes: null,
        subdimension: null,
        nacional: null,
        origen: null
    });

    const {mesActualKey,mesActual} = getCurrentMonth()
    const añoActual = getCurrentYear()
    

    const dimensiones = [
                    {key:'clave',dimension:'PRODUCTO'},
                    {key:'cliente',dimension:'CLIENTE'},
                    {key:'suc',dimension:'SUCURSAL'},
                    {key:'origen',dimension:'VENTA'},
                    {key:'linea',dimension:'LINEA'},
                    {key:'mes',dimension:'MES'},
                ]

    const tipoVenta = [
        {key:'TODOS',tipoVenta:'TODOS'},
        {key:'CRE',tipoVenta:'CREDITO'},
        {key:'CON',tipoVenta:'CONTADO'},
        {key:'COD',tipoVenta:'COD'},
    ]

    const tipoProducto = [
        {key:'TODOS',tipoProducto:'TODOS'},
        {key:true,tipoProducto:'NACIONAL'},
        {key:false,tipoProducto:'IMPORTADO'},
    ]

    const handleChange = (e)=>{
        const nombre = e.target.name
        let valor = e.target.value
        if(e.target.value === 'TODOS'){
            valor = null
        }
        setSeleccion({
            ...parametros,
            [nombre]: valor
        })  
         setParametros({
            ...parametros,
            [nombre]: valor
        })     
    }

    const ejecutar = () =>{
        if(parametros.ejercicio  && parametros.mes && parametros.subdimension){
            getData() 
        } 
    }

    return (
        <div className='contenedor_selectores'>
            <Card sx={cardSelectorsStyles}>
                <CardContent>
                    <FormControl fullWidth size="small">
                        <InputLabel id="año-label">Año</InputLabel>
                        <Select
                            labelId="año-label"
                            id="año-select"
                            //value={mesActualKey}
                            label="Año"
                            onChange={handleChange}
                            defaultValue="" 
                            name='ejercicio'
                        >
                            {getLastFiveYears().map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{mt:'10px'}} size="small">
                        <InputLabel id="mes-label">Mes</InputLabel>
                        <Select
                            labelId="mes-label"
                            id="mes-select"
                            //value={mesActual}
                            label="Mes"
                            onChange={handleChange}
                            defaultValue="" 
                            name= 'mes'
                        >
                            {getMonths().map(mes => <MenuItem key={mes.key} value={mes.key}>{mes.month.toUpperCase()}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{mt:'10px'}} size="small">
                        <InputLabel id="dimensiones-label">Dimension</InputLabel>
                        <Select
                            labelId="dimensiones-label"
                            id="dimensiones-select"
                            //value={mesActual}
                            label="Dimension"
                            onChange={handleChange}
                            defaultValue="" 
                            name='subdimension'
                        >
                            {dimensiones.map(dimension => <MenuItem key={dimension.key} value={dimension.key}>{dimension.dimension}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{mt:'10px'}} size="small">
                        <InputLabel id="tipo-venta-label">TipoDeVenta</InputLabel>
                        <Select
                            labelId="tipo-venta-label"
                            id="tipo-venta-select"
                            //value={mesActual}
                            label="TipoDeVenta"
                            onChange={handleChange}
                            defaultValue="" 
                            name='origen'
                        >
                            {tipoVenta.map(tipoVenta => <MenuItem key={tipoVenta.key} value={tipoVenta.key}>{tipoVenta.tipoVenta}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{mt:'10px'}} size="small">
                        <InputLabel id="tipo-producto-label">TipoDeProducto</InputLabel>
                        <Select
                            labelId="tipo-producto-label"
                            id="tipo-venta-select"
                            //value={mesActual}
                            label="TipoDeProducto"
                            onChange={handleChange}
                            defaultValue="" 
                            name='nacional'
                        >
                            {tipoProducto.map(tipoProducto => <MenuItem key={tipoProducto.key} value={tipoProducto.key}>{tipoProducto.tipoProducto}</MenuItem>)}
                        </Select>
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button onClick={ejecutar} variant="contained" fullWidth>Ejecutar</Button>
                </CardActions>
            </Card>
            <Card sx={cardStyles}>
                <CardContent>
                <Typography variant="subtitle2" sx={{mt:1}}>
                     Venta Neta: { totales.ventas && totales.ventas.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                </Typography>
                <Typography variant="subtitle2" sx={{mt:1}}>
                    Kilos: {totales.kilos}
                </Typography>
                <Typography variant="subtitle2" sx={{mt:1}}>
                    Precio Kilo: {totales.precio_kilo && totales.precio_kilo.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                </Typography>
                <Typography variant="subtitle2" sx={{mt:1}}>
                   Costo Neto: {totales.costo_neto && totales.costo_neto.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                </Typography>
                <Typography variant="subtitle2" sx={{mt:1}}>
                   Costo Kilo: {totales.costo_kilo && totales.costo_kilo.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                </Typography>
                <Typography variant="subtitle2" sx={{mt:1}}>
                   Utilidad: {totales.utilidad && totales.utilidad.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                </Typography>
                <Typography variant="subtitle2" sx={{mt:1}}>
                   % Utilidad: {totales.porc_utilidad && totales.porc_utilidad}
                </Typography>
                  
                </CardContent>

            </Card>

        </div>
    );
}

export default SelectoresAnalisis;

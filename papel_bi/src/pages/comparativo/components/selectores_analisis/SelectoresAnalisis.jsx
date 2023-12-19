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

    width:'100%',
    height:'90%',
    backgroundColor: 'light-gray'

}

const cardStyles = {

    width:'100%',
    height:'45%',
    backgroundColor: 'light-gray'

}


const SelectoresAnalisis = ({setParametros, parametros, getData}) => {



    const [seleccion, setSeleccion] = useState({
        dimension: null,
        ejercicio1: null,
        mes_ini1: null,
        mes_fin1: null,
        ejercicio2: null,
        mes_ini2: null,
        mes_fin2: null,
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
        if(parametros.ejercicio1  && parametros.mes_ini1 && parametros.mes_fin1 && parametros.ejercicio2  && parametros.mes_ini2 && parametros.mes_fin2 && parametros.dimension){
            getData() 
        } 
    }

    return (
        <div className='contenedor_selectores_comparativo'>
            <Card sx={cardSelectorsStyles}>
                <CardContent>
                <FormControl fullWidth  size="small">
                        <InputLabel id="dimensiones-label">Dimension</InputLabel>
                        <Select
                            labelId="dimensiones-label"
                            id="dimensiones-select"
                            //value={mesActual}
                            label="Dimension"
                            onChange={handleChange}
                            defaultValue="" 
                            name='dimension'
                        >
                            {dimensiones.map(dimension => <MenuItem key={dimension.key} value={dimension.key}>{dimension.dimension}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{mt:'10px'}} size="small">
                        <InputLabel id="año1-label">Año 1</InputLabel>
                        <Select
                            labelId="año1-label"
                            id="año1-select"
                            //value={mesActualKey}
                            label="Año1"
                            onChange={handleChange}
                            defaultValue="" 
                            name='ejercicio1'
                        >
                            {getLastFiveYears().map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{mt:'10px'}} size="small">
                        <InputLabel id="mes_ini1-label">Mes Inicial 1</InputLabel>
                        <Select
                            labelId="mes_ini1-label"
                            id="mes_ini1-select"
                            //value={mesActual}
                            label="Mes Final 1"
                            onChange={handleChange}
                            defaultValue="" 
                            name= 'mes_ini1'
                        >
                            {getMonths().map(mes => <MenuItem key={mes.key} value={mes.key}>{mes.month.toUpperCase()}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{mt:'10px'}} size="small">
                        <InputLabel id="mes_fin1-label">Mes Final 1</InputLabel>
                        <Select
                            labelId="mes_fin1-label"
                            id="mes_fin1-select"
                            //value={mesActual}
                            label="Mes Final 1"
                            onChange={handleChange}
                            defaultValue="" 
                            name= 'mes_fin1'
                        >
                            {getMonths().map(mes => <MenuItem key={mes.key} value={mes.key}>{mes.month.toUpperCase()}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{mt:'10px'}} size="small">
                        <InputLabel id="año-label">Año 2</InputLabel>
                        <Select
                            labelId="año2-label"
                            id="año2-select"
                            //value={mesActualKey}
                            label="Año2"
                            onChange={handleChange}
                            defaultValue="" 
                            name='ejercicio2'
                        >
                            {getLastFiveYears().map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{mt:'10px'}} size="small">
                        <InputLabel id="me_ini2s-label">Mes Inicial 2</InputLabel>
                        <Select
                            labelId="mes_ini2-label"
                            id="mes_ini2-select"
                            //value={mesActual}
                            label="Mes Inicial 2"
                            onChange={handleChange}
                            defaultValue="" 
                            name= 'mes_ini2'
                        >
                            {getMonths().map(mes => <MenuItem key={mes.key} value={mes.key}>{mes.month.toUpperCase()}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{mt:'10px'}} size="small">
                        <InputLabel id="mes_Fin2-label">Mes Final 2</InputLabel>
                        <Select
                            labelId="mes_fin2-label"
                            id="mes_fin2-select"
                            //value={mesActual}
                            label="Mes Final 2"
                            onChange={handleChange}
                            defaultValue="" 
                            name= 'mes_fin2'
                        >
                            {getMonths().map(mes => <MenuItem key={mes.key} value={mes.key}>{mes.month.toUpperCase()}</MenuItem>)}
                        </Select>
                    </FormControl>

                   
                </CardContent>
                <CardActions>
                    <Button onClick={ejecutar} variant="contained" color='success' fullWidth>Ejecutar</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default SelectoresAnalisis;

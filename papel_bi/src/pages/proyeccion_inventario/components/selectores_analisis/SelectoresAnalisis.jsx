import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {getLastFiveYears, getCurrentYear, getCurrentMonth, getMonths } from '../../../../helpers/date_utils'

import './SelectoresAnalisis.css'


const cardSelectorsStyles = {

    width:'100%',
    height:'50%',
    backgroundColor: 'light-gray'

}

const cardStyles = {

    width:'100%',
    height:'45%',
    backgroundColor: 'light-gray'

}


const SelectoresAnalisis = ({setParametros, parametros, getData, getDataAcumulado, totales, acumulado, setAcumulado}) => {


    const [seleccion, setSeleccion] = useState({
        ejercicio: null,
        mes: null,
        subdimension: 'clave',
        nacional: null,
        origen: null
    });

    const {mesActualKey,mesActual} = getCurrentMonth()
    const añoActual = getCurrentYear()


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
        if(parametros.ejercicio  && parametros.mes ){
            if(!acumulado){
                getData() 
            }else{
                getDataAcumulado()
            }
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
            
                    <FormControlLabel
                        
                        control={
                            <Checkbox checked={acumulado} onChange={()=>{setAcumulado(!acumulado)}} color='error'  /> 
                        }
                        label={<Typography sx={{fontSize:"1.1rem"}}>Acumulado Anual</Typography>}
                        sx={{fontSize:"4rem", '& .MuiSvgIcon-root': { fontSize: 30 }}}
                    />
                  
                </CardContent>
                <CardActions>
                    <Button onClick={ejecutar} variant="contained" color={'error'} fullWidth>Ejecutar</Button>
                </CardActions>
            </Card>
            <Card sx={cardStyles}>
                <CardContent>
                <Typography variant="subtitle2" sx={{mt:1,fontSize:"1.2rem"}}>
                     Venta Neta: { totales.ventas && totales.ventas.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt:1,fontSize:"1.2rem"}}>
                    Kilos: {totales.kilos}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt:1,fontSize:"1.2rem"}}>
                    Precio Kilo: {totales.precio_kilo && totales.precio_kilo.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt:1,fontSize:"1.2rem"}}>
                   Costo Neto: {totales.costo_neto && totales.costo_neto.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt:1,fontSize:"1.2rem"}}>
                   Costo Kilo: {totales.costo_kilo && totales.costo_kilo.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt:1,fontSize:"1.2rem"}}>
                   Utilidad: {totales.utilidad && totales.utilidad.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt:1,fontSize:"1.2rem"}}>
                   % Utilidad: {totales.porc_utilidad && totales.porc_utilidad}
                </Typography>
                  
                </CardContent>

            </Card>

        </div>
    );
}

export default SelectoresAnalisis;

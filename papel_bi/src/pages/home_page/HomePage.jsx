import React from 'react';
import { Link } from "react-router-dom";
import Bi from '../../images/Bi.png'
import Bi2 from '../../images/Bi2.jpeg'
import "./HomePage.css"
import { Card } from '@mui/material';
import CardMaterialIcon from '../../components/Card/CardMaterialIcon'




const HomePage = () => {
    return (
        <div className='contenedor-home'>
            <div className='contenedor-imagen'>
                <Link to={"/dashboard"} >
                    <img className='imagen-bi' src={Bi2} alt="logo" /> 
                </Link>
                
            </div> 
            <div className='contenedor-titulo'>
                <h3>Business Intelligence Papel s.a.</h3>
            </div>
           <div className='contenedor-modulos'>
                
                
                <Link to={"/analisis_venta"} className='link-modulos'>
                   <CardMaterialIcon titulo={'Analisis Ventas'}></CardMaterialIcon> 
                </Link>
                <Link to={"/proyeccion_costo"} className='link-modulos'>
                    <CardMaterialIcon titulo={'Analisis Costo de Venta'}></CardMaterialIcon>
                </Link>
                <Link to={"/proyeccion_inventario"} className='link-modulos'>
                    <CardMaterialIcon titulo={'Proyeccion Inventario'}></CardMaterialIcon>
                </Link>
                <Link to={"/comparativo"} className='link-modulos'>
                    <CardMaterialIcon titulo={'Comparativo Ventas'}></CardMaterialIcon>
                </Link> 
                
            </div> 
        </div>
    );
}

export default HomePage;

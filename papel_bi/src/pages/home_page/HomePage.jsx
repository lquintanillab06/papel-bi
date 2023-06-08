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
                <img className='imagen-bi' src={Bi2} alt="logo" /> 
            </div>
            <div className='contenedor-titulo'>
                <h3>Business Intelligence Papel s.a.</h3>
            </div>
            <div className='contenedor-modulos'>
                
                <Link to={"/analisis_venta"} className='link-modulos'>
                    <CardMaterialIcon titulo={'Analisis Ventas'}></CardMaterialIcon>
                </Link>
                <Link to={"/analisis_venta"} className='link-modulos'>
                    <CardMaterialIcon titulo={'Analisis Costo'}></CardMaterialIcon>
                </Link>
                <Link to={"/analisis_venta"} className='link-modulos'>
                    <CardMaterialIcon titulo={'Inventario Capas'}></CardMaterialIcon>
                </Link>
             
            </div>
        </div>
    );
}

export default HomePage;

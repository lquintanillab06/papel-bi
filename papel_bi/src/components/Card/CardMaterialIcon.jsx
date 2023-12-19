import React from 'react';

import './CardMaterialIcon.css'
const CardMaterialIcon = ({titulo, descripcion, icono, funcion}) => {

  

    const handleClick = () =>{
        if(funcion){
            funcion();
        }
       
    }

    return (
        <>
            <div className="card-md-icon" onClick={handleClick} >
                <div className="icono-card-md">
                    <i className={icono} aria-hidden="true"></i>
                </div>
                <div className="text-md-icon">
                    <h3>{titulo}</h3>
                    <p>{descripcion}</p>
                </div>
               <div className="card-md-img_row">
                    →
               </div>
            </div>       
        </>
    );
}


export default CardMaterialIcon;

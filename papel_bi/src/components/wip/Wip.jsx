import React from 'react';
import Working from '../../images/under.png'

import "./Wip.css"


const Wip = ({message}) => {
    return (
        <div className='wip-container'>   
            <h1 className='titulo'>Estamos trabajando...</h1>
            <img src={Working} alt="working" className='imagen-work' />
            <h2>Próximamente estará disponible la funcionalidad {message.toUpperCase()}</h2>
        </div>
    );
}

export default Wip;

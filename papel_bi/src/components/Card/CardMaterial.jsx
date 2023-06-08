import React from 'react';


import './Card.css';

const CardMaterial = ({titulo}) => {
    return (
        <>
            <div class="card-md">
               <h3>{titulo}</h3>
                <p></p>
            </div>       
        </>
    );
}

export default CardMaterial;

import React from 'react';

import './Card.css'

const CardBussines = () => {
    return (
        <>
            <div className="card">
            <div className="card-avatar">
                dfñldskfñ
            </div>
            <div className="card-details">
                <div className="name">Saitama</div>
                <div className="occupation">Hero</div>
                
                <div className="card-about">
                    <div className="item">
                        <span className="value">25</span>
                        <span className="label">Age</span>
                    </div>
                    <div className="item">
                        <span className="value">70 kg </span>
                        <span className="label">Weight</span>
                    </div>
                    <div className="item">
                        <span className="value">175 cm</span>
                        <span className="label">Height</span>
                    </div>
                </div>
                <div className="skills">
                    <span className="value">Immeasurable Physical Prowess, Supernatural Reflexes and Senses, Invulnerability, Indomitable Will, Enhanced Fighting Skill</span>
                </div>
            </div>
            </div>
        </>
    );
}

export default CardBussines;

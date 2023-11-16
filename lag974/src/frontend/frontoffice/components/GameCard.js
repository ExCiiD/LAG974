import React from 'react';

import '../styles/GameCard.css';

const GameCard = ({ nomJeu, imageJeu }) => {
    return (
        <div className='gameCard'>
                <div className='imgContainer'>
                <img className='gameImg' src={imageJeu} alt={`image de ${nomJeu}`} />
                </div>
                <div className='gameName'>
                <h2>{nomJeu}</h2>
            </div>
        </div>
    )
}

export default GameCard
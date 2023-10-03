import React from 'react';

import '../styles/GameCard.css';

import lol from '../images/LOL.jpg'

const GameCard = () => {
    return (
        <div className='gameCard'>
            <a  href='#'>
                <div className='imgContainer'>
                        <img className='gameImg' src={lol} alt='image de jeu' />
                </div>
                <div className='gameName'>
                    <h2>GameName</h2>
                </div>     
            </a>    
        </div>
    )
}

export default GameCard
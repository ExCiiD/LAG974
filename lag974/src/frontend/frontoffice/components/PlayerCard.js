import React from 'react';

import '../styles/PlayerCard.css';

const PlayerCard = (props) => {
    const { lane, photoURL, socialNetworks, name, pseudo, firstName } = props;

    return (
        <div className="player-card">
            <div className="lane">{lane}</div>
            <div className='playerImgContainer'>
                <img src={photoURL} alt={`${name}'s photo`} className="player-photo" />
            </div>
            <div className="social-networks">
                {socialNetworks.map((network, index) => (
                    <a key={index} href={network.url} target="_blank" rel="noreferrer">{network.name}</a>
                ))}
            </div>
            <div className="player-name">{name}</div>
            <div className="player-pseudo">"{pseudo}"</div>
            <div className="player-first-name">{firstName}</div>
        </div>
    );
};

export default PlayerCard;
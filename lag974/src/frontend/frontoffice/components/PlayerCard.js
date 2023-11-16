import React from 'react';

import '../styles/PlayerCard.css';

//images :
import twitter from '../images/twitter.png';
import twitch from '../images/twitch.png';
import ytb from '../images/youtube.png';
import instagram from '../images/instagram.png';

const PlayerCard = ({ photoJoueur, liensReseauxJoueur, nomJoueur, pseudoJoueur, prenomJoueur }) => {


    return (
        <div className="player-card">
            <div className='playerImgContainer'>
                <img src={photoJoueur || 'default-image-path.jpg'} alt={`${nomJoueur}`} className="player-photo" />
            </div>
            <div className="social-networks">
                <a href={liensReseauxJoueur.twitter} ><img className='reseauxPC' src={twitter} alt='twitter' /></a>
                <a href={liensReseauxJoueur.insta} ><img className='reseauxPC' src={instagram} alt='insta' /></a>
                <a href={liensReseauxJoueur.youtube} ><img className='reseauxPC' src={ytb} alt='youtube' /></a>
                <a href={liensReseauxJoueur.twitch} ><img className='reseauxPC' src={twitch} alt='twitch' /></a>
            </div>
            <div className="player-name">{nomJoueur}</div>
            <div className="player-pseudo">"{pseudoJoueur}"</div>
            <div className="player-first-name">{prenomJoueur}</div>
        </div>
    );
};

export default PlayerCard;

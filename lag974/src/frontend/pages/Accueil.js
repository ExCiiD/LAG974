import React from 'react';

import '../styles/Accueil.css';
import '../styles/Titles.css';

import fb from '../images/facebook.png';
import dc from '../images/discord.png';
import twitch from '../images/twitch.png';
import ytb from '../images/youtube.png';
import Slider from '../components/Slider';
import GameCard from '../components/GameCard';

function Accueil() {
    return (
        <div className='accueil'>
            <div className='sectionEvenement'>
                {/* <Slider /> */}
            </div>
            <div className='bandeReseaux'>
                <a href='https://www.facebook.com/LAG974/?locale=fr_FR' ><img className='iconeReseaux' src={fb} alt='lien' /></a>
                <a href='https://discord.gg/AApCDYp4XJ' ><img className='iconeReseaux' src={dc} alt='lien' /></a>
                <a href='https://www.twitch.tv/lag974' ><img className='iconeReseaux' src={twitch} alt='lien' /></a>
                <a href='https://www.youtube.com/@LAG974' ><img className='iconeReseaux' src={ytb} alt='lien' /></a>
            </div>
            <div className='sectionEquipes'>
                <GameCard />
                <GameCard />
                <GameCard />
            </div>
            <div className='bandePartenaires'>partenaires</div>
        </div>
    )
}

export default Accueil
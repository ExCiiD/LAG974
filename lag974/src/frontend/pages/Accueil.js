import React from 'react';
import { useState } from 'react';
import { NavLink } from "react-router-dom";

import '../styles/Accueil.css';

import fb from '../images/facebook.png';
import dc from '../images/discord.png';
import twitch from '../images/twitch.png';
import ytb from '../images/youtube.png';
import EventSlider from '../components/Slider';
import GameCard from '../components/GameCard';
import CurrentPartenaire from '../components/CurrentPartenaire';
import nlBtn from '../images/nlBtn.png';
import logo_gold from '../images/logo_gold.png';
import leaveBtn from '../images/leaveBtn.png';
import Carousel3D from '../components/Carousel';

function Accueil() {

    const [popUp, setPopUp] = useState(false);

    const openPopUp = () => {
        setPopUp(!popUp);
    };

    const closePopUp = () => {
        setPopUp(false);
    };

    return (
        <div className='content accueil'>
            <div className='sectionEvenement'>
                {/* <EventSlider /> */}
                < Carousel3D />
                <div className='newLetterBloc'>
                    <p>inscrivez vos à notre newsletter pour ne rater aucun evenement !</p>
                    <button className='newsLetterBtn' onClick={openPopUp} >NEWSLETTER</button>
                </div>
                <div className={`popUpNl ${popUp ? 'unHide' : ''}`} >
                    <div className='popUpAndCrossContainer'>
                        <div className='cadrePopUp'>
                            <img className='popUpLogo' src={logo_gold} alt='logo_gold' />'
                            <form className='inputAndBtn'>
                                <input type='email' id='nlEmail' placeholder='EMAIL' />
                                <input className='popUpBtn' type="image" src={nlBtn} border="0" alt="Submit" />
                            </form>
                        </div>
                        <img className='leaveBtn' src={leaveBtn} alt="leaveBtn" onClick={closePopUp} />
                    </div>
                </div>
            </div>
            <div className='bandeReseaux'>
                <a href='https://www.facebook.com/LAG974/?locale=fr_FR' ><img className='iconeReseaux' src={fb} alt='lien' /></a>
                <a href='https://discord.gg/AApCDYp4XJ' ><img className='iconeReseaux' src={dc} alt='lien' /></a>
                <a href='https://www.twitch.tv/lag974' ><img className='iconeReseaux' src={twitch} alt='lien' /></a>
                <a href='https://www.youtube.com/@LAG974' ><img className='iconeReseaux' src={ytb} alt='lien' /></a>
            </div>
            <div className='sectionEquipes'>
                <NavLink className='navLinks' to={"/equipes/roster"}><GameCard /></NavLink>
                <NavLink className='navLinks' to={"/equipes/roster"}><GameCard /></NavLink>
                <NavLink className='navLinks' to={"/equipes/roster"}><GameCard /></NavLink>
            </div>
            <div className='bandePartenaires'>
                {/* <CurrentPartenaire />
                <CurrentPartenaire />
                <CurrentPartenaire />
                <CurrentPartenaire />
                <CurrentPartenaire /> */}
            </div>
        </div>
    )
}

export default Accueil
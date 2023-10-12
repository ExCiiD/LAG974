import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Partenaires.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import logo1 from '../images/youtube.png';
import logo2 from '../images/rl8.jpg';
import logo3 from '../images/twitch.png';
import logo4 from '../images/facebook.png';
import logo5 from '../images/discord.png';
import logo6 from '../images/banner.png';

//SIMULATION DONNEES API POUR LOGOS
const logos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6
]
//PARAMETRES SLIDER
const Partenaires = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        centerMode: true,
        centerPadding: 0,
    };

    return (
        <div className='content partenaires'>
            <div className='pageTitleCorners'>
                <div className='pageTitle'>
                    <h1 className='pageTitleContent'>PARTENAIRES</h1>
                </div>
            </div>
            <div className='pSliderContainer'>
                <Slider {...settings} style={{ display: 'flex', alignItems: 'center' }}>
                    {logos.map((logo, index) => (
                        <div key={index} style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={logo} alt={`logo-${index}`} style={{ width: '80px', height: '80px', borderRadius: '100%', display: 'block' }} />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className='pContactUs'>
                <p>vous voulez rejoindre notre groupe en tant que partenaire?</p>
                <Link className='normalButton' to="/contact?sujet=Demande%20de%20partenariat">CONTACTEZ NOUS</Link>
            </div>
        </div>
    )
}

export default Partenaires
import React from 'react';

import { NavLink } from "react-router-dom";

import logo_white from '../images/logo_white.png';
import fFb from '../images/w_fb_icon.png';
import fTwitch from '../images/w_twitch_icon.png';
import fYtb from '../images/w_ytb_icon.png';
import fDc from '../images/w_dc_icon.png';

import '../styles/Footer.css';

function Footer() {
    return (
        <div className='footer'>
            <div className='footer_black'>
                <div className='bFooter_left'>
                    <img className='logo_footer' src={logo_white} alt="logo" />
                    <a className='mailFooter' href='mailto:staff.gmail@gmail.com'>staff.lag974@gmail.com</a>
                    <div className='footer_socials_container'>
                        <a href='https://www.facebook.com/LAG974/?locale=fr_FR'><img className='footer_socials_icons' src={fFb} alt="facebook icon" /></a>
                        <a href='https://discord.gg/AApCDYp4XJ'><img className='footer_socials_icons' src={fDc} alt="discord icon" /></a>
                        <a href='https://www.twitch.tv/lag974'><img className='footer_socials_icons' src={fTwitch} alt="twitch icon" /></a>
                        <a href='https://www.youtube.com/@LAG974'><img className='footer_socials_icons' src={fYtb} alt="youtube icon" /></a>
                    </div>
                </div>
                <div className='bFooter_right'>
                    <ul className='nav_footer'>
                        <li><NavLink className='navLinks' to={"/"}>ACCUEIL</NavLink></li>
                        <li><NavLink className='navLinks' to={"/a_propos"}>A PROPOS</NavLink></li>
                        <li><NavLink className='navLinks' to={"/evenements"}>EVENEMENTS</NavLink></li>
                        <li> <NavLink className='navLinks' to={"/equipes"}>EQUIPES</NavLink></li>
                        <li><NavLink className='navLinks' to={"/partenaires"}>PARTENAIRES</NavLink></li>
                        <li><NavLink className='navLinks' to={"/contact"}>CONTACT</NavLink></li>
                    </ul>
                </div>
            </div>
            <div className='footer_gold'>
                <a href='https://github.com/ExCiiD'>GITHUB</a>
                <span>ARISON NIRINA</span>
                <a href='#'>MENTION LÉGALE</a>
                <span>© LAG974  2023</span>
            </div>
        </div>
    )
}

export default Footer;
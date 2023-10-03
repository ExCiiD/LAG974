import React from 'react';
import { NavLink } from "react-router-dom";
import logo_gold from '../images/logo_gold.png';
import fFb from '../images/w_fb_icon.png';
import fTwitch from '../images/w_twitch_icon.png';
import fYtb from '../images/w_ytb_icon.png';
import fDc from '../images/w_dc_icon.png';
import '../styles/footer.css';

function Footer() {
    return (
        <div className='footer'>
            <div className='footer_black'>
                <div className='bFooter_left'>
                    <img className='logo_footer' src={logo_gold} alt="logo" />
                    <a href='mailto:staff.gmail@gmail.com'>staff.lag974@gmail.com</a>
                    <div className='footer_socials_container'>
                        <a href='#'><img className='footer_socials_icons' src={fFb} alt="facebook icon" /></a>
                        <a href='#'><img className='footer_socials_icons' src={fDc} alt="discord icon" /></a>
                        <a href='#'><img className='footer_socials_icons' src={fTwitch} alt="twitch icon" /></a>
                        <a href='#'><img className='footer_socials_icons' src={fYtb} alt="youtube icon" /></a>
                    </div>
                </div>
                <div className='bFooter_right'>
                    <ul className='nav_footer'>
                        <li><NavLink className='navLinks' to={"/"}>ACCUEIL</NavLink></li>
                        <li><NavLink className='navLinks' to={"/Apropos"}>A PROPOS</NavLink></li>
                        <li><NavLink className='navLinks' to={"/Evenements"}>EVENEMENTS</NavLink></li>
                        <li> <NavLink className='navLinks' to={"/Equipes"}>EQUIPES</NavLink></li>
                        <li><NavLink className='navLinks' to={"/Partenaires"}>PARTENAIRES</NavLink></li>
                        <li><NavLink className='navLinks' to={"/Contact"}>CONTACT</NavLink></li>
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
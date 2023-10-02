import React from 'react';
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
                        <li><a href="#">ACCUEIL</a></li>
                        <li><a href="#">A PROPOS</a></li>
                        <li><a href="#">EVENEMENTS</a></li>
                        <li><a href="#">EQUIPES </a></li>
                        <li><a href="#">PARTENAIRES</a></li>
                        <li><a href="#">CONTACT</a></li>
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
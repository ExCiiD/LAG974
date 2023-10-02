import React from "react";
import '../styles/navbar.css';
import logo_black from '../images/logo_black.png';
import { useState } from 'react';



function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="navbar">
            <img src={logo_black} alt="logo" />
            <ul className={`navlist ${isOpen ? 'open' : ''}`}>
                <li><a href="#">ACCUEIL</a></li>
                <li><a href="#">A PROPOS</a></li>
                <li><a href="#">EVENEMENTS</a></li>
                <li className="menu-deroulant">
                    <a href="#">EQUIPES ▼</a>
                    <ul className="sous-menu">
                        <li><a href="#">LOL</a></li>
                        <li><a href="#">RL</a></li>
                        <li><a href="#">VAL</a></li>
                    </ul>
                </li>
                <li><a href="#">PARTENAIRES</a></li>
                <li><a href="#">CONTACT</a></li>
            </ul>
            <a href="#" className="connexion_btn">SE CONNECTER</a>
            <div id="side-bar">
                <div className={`toggle-btn ${isOpen ? 'open' : ''}`} id="btn" onClick={toggleMenu}>
                    <span id="topbarbtn"></span>
                    <span id="midbarbtn"></span>
                    <span id="botbarbtn"></span>
                </div>
            </div>
        </div>
    )
}


export default Navbar; 
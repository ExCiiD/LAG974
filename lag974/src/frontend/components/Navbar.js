import React from "react";
import { useState } from 'react';

import { NavLink } from "react-router-dom";

import logo_black from '../images/logo_black.png';

import '../styles/Navbar.css';

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="navbar">
            <img src={logo_black} alt="logo" />
            <ul className={`navlist ${isOpen ? 'open' : ''}`}>
                <li>
                    <NavLink className='navLinks' to={"/"} onClick={closeMenu}>ACCUEIL</NavLink>
                </li>
                <li>
                    <NavLink className='navLinks' to={"/a_propos"} onClick={closeMenu}>A PROPOS</NavLink>
                </li>
                <li>
                    <NavLink className='navLinks' to={"/evenements"} onClick={closeMenu}>EVENEMENTS</NavLink>
                </li>
                <li className="navlinks menu-deroulant">
                    <NavLink className='navLinks' to={"/equipes"} onClick={closeMenu}>EQUIPES</NavLink>
                    <ul className="sous-menu">
                        <li><a href="#">LOL</a></li>
                        <li><a href="#">RL</a></li>
                        <li><a href="#">VAL</a></li>
                    </ul>
                </li>
                <li> <NavLink className='navLinks' to={"/partenaires"} onClick={closeMenu}>PARTENAIRES</NavLink></li>
                <li> <NavLink className='navLinks' to={"/contact"} onClick={closeMenu}>CONTACT</NavLink></li>
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
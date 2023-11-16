import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import logo_black from '../images/logo_black.png';
import signin from '../images/signin.png';
import settings from '../images/settings.png';
import '../styles/Navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [jeux, setJeux] = useState([]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const navigate = useNavigate();

    const toggleMode = () => {
        if (window.location.pathname.startsWith("/backoffice")) {
            navigate("/");
        } else {
            navigate("/backoffice");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsConnected(true);
        } else {
            setIsConnected(false);
        }
        // Charger les données des jeux
        axios.get(`/lagapi/jeux`)
            .then(response => {
                setJeux(response.data.jeux);
                console.log(response.data.jeux);
            })
            .catch(error => {
                console.error("Erreur lors du chargement des jeux:", error);
            });
    }, []);

    useEffect(() => {
        axios.get(`/lagapi/jeux`)
    })
    return (
        <div className="navbar">
            <img src={logo_black} alt="logo" />
            <ul className={`navlist ${isOpen ? 'open' : ''}`}>
                <li><NavLink className='navLinks' to={"/"} onClick={closeMenu}>ACCUEIL</NavLink></li>
                <li><NavLink className='navLinks' to={"/a_propos"} onClick={closeMenu}>A PROPOS</NavLink></li>
                <li><NavLink className='navLinks' to={"/evenements"} onClick={closeMenu}>EVENEMENTS</NavLink></li>
                <li className="navlinks menu-deroulant">
                    <NavLink className='navLinks' to={"/equipes"} onClick={closeMenu}>EQUIPES</NavLink>
                    <ul className="sous-menu">
                        {jeux.map(jeu => (
                            <li key={jeu._id}>
                                <NavLink className='navLinks' to={`/equipes/roster/${jeu.nomJeu}`}>{jeu.acronyme}</NavLink>
                            </li>
                        ))}
                    </ul>
                </li>
                <li> <NavLink className='navLinks' to={"/partenaires"} onClick={closeMenu}>PARTENAIRES</NavLink></li>
                <li> <NavLink className='navLinks' to={"/contact"} onClick={closeMenu}>CONTACT</NavLink></li>
            </ul>
            <button className="navbarBtn" onClick={() => navigate("/backoffice/login")}><img src={signin} alt='boutton connecter' /></button>
            {isConnected && <button className="navbarBtn" onClick={toggleMode}><img src={settings} alt='boutton admin' /></button>}
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

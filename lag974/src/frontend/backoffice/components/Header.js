import React, { useState } from 'react';

//images :

import logo from '../images/lagLogoWhite.png';
import signOut from '../images/signOut.png';
import defaultIcon from '../images/defaultUserIcon.png';

import '../styles/Header.css';

const Header = () => {

    // État pour suivre le statut de connexion
    const [isLoggedIn, setIsLoggedIn] = useState();

    //fonction pour deconnecter un admin
    const handleLogout = () => {
        // Supprimez le token du stockage local ou de la session
        localStorage.removeItem('token');

        // Mettez à jour l'état pour refléter que l'utilisateur est déconnecté
        setIsLoggedIn(false);
        window.location.href = '/';
        console.log(localStorage.getItem('token'));
    }

    function decodeJWT(token) {
        try {
            // Split the token into header, payload, and signature
            const [, payloadEncoded] = token.split('.');

            // Base64Url decode the payload
            const payloadDecoded = atob(payloadEncoded.replace('-', '+').replace('_', '/'));

            return JSON.parse(payloadDecoded);
        } catch (error) {
            console.error("Failed to decode JWT:", error);
            return null;
        }
    }

    // Récupérez le token du stockage local
    const storedToken = localStorage.getItem('token');

    // Décoder le token pour obtenir les informations de l'admin
    const decodedToken = storedToken ? decodeJWT(storedToken) : null;

    // Utiliser les informations décodées pour initialiser adminInfo
    const adminInfo = decodedToken ? {
        username: decodedToken.username || "Admin123", // à remplacer par la clé appropriée
        icon: decodedToken.icon || defaultIcon
    } : {
        username: "Admin123",
            icon: defaultIcon
    };

    const getAdminIcon = () => {
        return adminInfo.icon;
    }

    return (
        <div className="header">
            <div className="logoBack"><img src={logo} alt="logo" /> </div> {/* Remplacez par votre logo */}
            <div className="admin-info">
                <div className='adminIcon'>
                    <img src={getAdminIcon()} alt="Icon de l'admin" />
                </div>
                <span>{adminInfo.username}</span>
                <button className='signOutBtn' onClick={handleLogout}><img src={signOut} alt="bouton deconnection" /></button>
            </div>
        </div>
    );
}

export default Header;
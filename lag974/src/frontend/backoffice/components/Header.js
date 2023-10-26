import React from 'react';

//images :

import logo from '../images/lagLogoWhite.png';
import signOut from '../images/signOut.png';
import defaultIcon from '../images/defaultUserIcon.png';

import '../styles/Header.css';

const Header = () => {
    // Simuler les informations de l'admin connecté
    const adminInfo = {
        username: "Admin123",
        icon: "" // remplacez par le chemin vers icône par défaut
    };

    // Fonction pour obtenir l'icône de l'administrateur ou l'icône par défaut si aucune icône d'administrateur n'est fournie.
    const getAdminIcon = () => {
        if (adminInfo.icon.trim()) { // Vérifie si un chemin non vide a été fourni pour l'icône de l'admin.
            return adminInfo.icon;  // Si oui, retournez ce chemin.
        }
        // Sinon, retourne le chemin de l'icône par défaut.
        return defaultIcon;
    }

    return (
        <div className="header">
            <div className="logoBack"><img src={logo} alt="logo" /> </div> {/* Remplacez par votre logo */}
            <div className="admin-info">
                <div className='adminIcon'>
                    <img src={getAdminIcon()} alt="Icon de l'admin" />
                </div>
                <span>{adminInfo.username}</span>
                <button className='signOutBtn'><img src={signOut} alt="bouton deconnection" /></button>
            </div>
        </div>
    );
}

export default Header;
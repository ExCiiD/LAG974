import React, { useState } from 'react';
import axios from 'axios';

import '../styles/Sidebar.css';

//images:
import evenements from '../images/Trophy.png';
import joueurs from '../images/joueur.png';
import equipes from '../images/equipes.png';
import partenaires from '../images/partenaires.png';
import admins from '../images/admins.png';
import home from '../images/home.png';


const SideBar = ({ setActiveTab }) => {
    const [activeOnglet, setActiveOnglet] = useState(''); // Ajouter un état pour l'onglet actif

    const handleOngletClick = (ongletName) => {
        setActiveOnglet(ongletName);
        setActiveTab(ongletName);
    }

    return (
        <div className="sidebar">
            <button
                className='homeBtn'
                onClick={() => window.location.href = "/"}
            >
                <img src={home} alt='bouton FrontOffice' />
            </button>
            <ul>
                {[
                    { name: 'evenements', icon: evenements, label: 'Événements' },
                    { name: 'joueurs', icon: joueurs, label: 'Joueurs' },
                    { name: 'equipes', icon: equipes, label: 'Équipes' },
                    { name: 'partenaires', icon: partenaires, label: 'Partenaires' },
                    { name: 'admins', icon: admins, label: 'Admins' },
                ].map(item => (
                    <li key={item.name}>
                        <div
                            className={`sidebarOnglet ${activeOnglet === item.name ? 'active' : ''}`} // Ajouter la classe active si nécessaire
                            onClick={() => handleOngletClick(item.name)}
                        >
                            <img src={item.icon} alt='img onglet' /> {item.label}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideBar;
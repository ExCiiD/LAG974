import React, { useState } from 'react';

//component :
//main
import SideBar from '../components/Sidebar.js';
import Header from '../components/Header.js';
//content
import EventComponent from '../components/EventComponent.js';
import EquipesComponent from '../components/EquipeComponent.js';
import PartenairesComponent from '../components/PartenaireComponent.js';
import JoueursComponent from '../components/JoueurComponent.js';
import AdminsComponent from '../components/AdminComponent.js';

import '../styles/AccueilBack.css'

const AccueilBack = () => {
    const [activeTab, setActiveTab] = useState("");

    return (
        <div className="accueilBack">
            <Header />
            <div className='accueilContentContainer'>
                <SideBar setActiveTab={setActiveTab} />
                <div className="accueilBackComponentContent">
                    {activeTab === "evenements" && <EventComponent />}
                    {activeTab === "joueurs" && <JoueursComponent />}
                    {activeTab === "equipes" && <EquipesComponent />}
                    {activeTab === "partenaires" && <PartenairesComponent />}
                    {activeTab === "admins" && <AdminsComponent />}
                </div>
            </div>
        </div>
    );
};

export default AccueilBack;

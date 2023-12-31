import React from 'react'
import { useState, useEffect } from 'react';
import GameCard from '../components/GameCard.js';
import { NavLink } from "react-router-dom";
import axios from 'axios';

import '../styles/Equipes.css';

const Equipes = () => {

    const [jeux, setJeux] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchJeuData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/lagapi/jeux`);
                // Mettre à jour l'état avec les données de l'équipe
                setJeux(response.data.jeux);
                console.log('reponse :', response.data.jeux);
                setIsLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement des données de l'équipe:", error);
            }
        };
        fetchJeuData();
    }, []);

    return (
        <div className='content equipes'>
            <div className='pageTitleCorners'>
                <div className='pageTitle'>
                    <h1 className='pageTitleContent'>EQUIPES</h1>
                </div>
            </div>
            {isLoading ? (
                <div ><i className='bx bx-loader-circle bx-spin' style={{ color: '#fbf6f6' }} ></i></div>
            ) : (
            <div className='equipesCardsContainer'>
                {Array.isArray(jeux) && jeux.map(jeu => (
                    <NavLink key={jeu._id} className='navLinks' to={`/equipes/roster/${jeu.nomJeu}`}>
                        <GameCard nomJeu={jeu.nomJeu} imageJeu={jeu.thumbnailJeu} />
                    </NavLink>
                ))}
            </div>
            )}
        </div>
    )
}

export default Equipes 
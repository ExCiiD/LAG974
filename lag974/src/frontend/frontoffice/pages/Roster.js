import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

import '../styles/Roster.css';

import PlayerCard from '../components/PlayerCard.js'
import EventHistoric from '../components/EventHistoric.js';

const Roster = () => {
    let { nomJeu } = useParams();
    const [team, setTeam] = useState({ roster: [], historique: { evenements: [] } });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/lagapi/equipes/nomjeu/${nomJeu}`);
                // Mettre à jour l'état avec les données de l'équipe
                setTeam(response.data);
                console.log('reponse :', response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement des données de l'équipe:", error);
            }
        };

        fetchTeamData();
    }, [nomJeu]);

    const [isEventHistoryVisible, setEventHistoryVisible] = useState(false);

    return (
        <div className='content roster'>
            <div className='pageTitleCorners'>
                <div className='pageTitle'>
                    <h1 className='pageTitleContent'>{team.jeu?.nomJeu || 'ROSTER'}</h1>
                </div>
            </div>
            {isLoading ? (
                <div ><i className='bx bx-loader-circle bx-spin' style={{ color: '#fbf6f6' }} ></i></div>
            ) : (
            <div className='rosterContentContainer'>
                <div className='playerCardContainer'>
                            {
                                team.roster && team.roster.map(({ refJoueur }) => (
                                    <PlayerCard key={refJoueur._id} {...refJoueur} />
                                ))
                            }
                </div>
                <button className='mobileViewButton' onClick={() => setEventHistoryVisible(true)}>Voir l'historique</button>
                {isEventHistoryVisible ? (
                    <div className='eventHistoryOverlay' >
                        <button className='closeButton' onClick={() => setEventHistoryVisible(false)}>Quitter</button>
                        <EventHistoric events={team.historique.evenements} />
                    </div>
                ) : (
                    <div className='rosterHistoricContainer'>
                            <EventHistoric events={team.historique.evenements} />
                    </div>
                )}
            </div>
            )
            } 
        </div>
    )
}

export default Roster
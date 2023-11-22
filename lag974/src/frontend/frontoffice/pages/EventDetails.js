import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

import '../styles/Evenements.css'
import '../styles/EventDetails.css'

const EventDetails = () => {
    const { eventId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/lagapi/evenements/${eventId}`);
                // Mettre à jour l'état avec les données de l'équipe
                setEventData(response.data.evenement);
                console.log('reponse event :', response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement des données de l'evenement:", error);
            }
        };
        fetchEventData();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) {
            // Handle undefined or null dateString
            return "Date inconnue";
        }
        // Séparation de la date en composants (année, mois, jour)
        const parts = dateString.split('-');
        if (parts.length !== 3) {
            console.error("Format de date incorrect:", dateString);
            return "Date inconnue";
        }

        // Inversion des composants pour obtenir le format jj/mm/aaaa
        return `${parts[2].substring(0, 2)}/${parts[1]}/${parts[0]}`;
    };

    return (
        <div className='content eventDetail'>
            {isLoading ? (
                <div ><i className='bx bx-loader-circle bx-spin' style={{ color: '#fbf6f6' }} ></i></div>
            ) : (
                <div className='blocPrincipal'>
                    <div className='pageTitleCorners'>
                        <div className='pageTitle'>
                            <h1 className='pageTitleContent'>{eventData.nomEvent}</h1>
                        </div>
                    </div>
                    <div className='shortDescD'>
                        <div className='blocGauche'>
                            <div className='sdImgContainer'>
                                <div className='imgTestBloc'>
                                    <img style={{ width: '100%', height: '100%' }} src={eventData.thumbnailEvent} alt={eventData.nomJeu} />
                                </div>
                            </div>
                            <p>{eventData.description} </p>
                        </div>
                        <div className='blocDroite'>
                            <div className='blocIc'>
                                <div className='pageTitleCornersMin'>
                                    <div className='pageTitleMin'>
                                        <h1 className='pageTitleContentMin'>Quand ?</h1>
                                    </div>
                                </div>
                                <p> {formatDate(eventData.dateDebut)}
                                    {eventData.dateFin ? (
                                        <> au {formatDate(eventData.dateFin)}</>
                                    ) : (
                                        <></>
                                    )} </p>
                            </div>
                            {/* type de tournoi */}
                            <div className='blocIc'>
                                <div className='pageTitleCornersMin'>
                                    <div className='pageTitleMin'>
                                        <h1 className='pageTitleContentMin'>Où ?</h1>
                                    </div>
                                </div>
                                <p> {eventData.typeTournoi} </p>
                            </div>
                        </div>
                    </div>
                    <div className='blocBas'>
                        {/* nombre participants */}
                        <div className='blocIc'>
                            <div className='pageTitleCornersMin'>
                                <div className='pageTitleMin'>
                                    <h1 className='pageTitleContentMin'>Nombre de participants</h1>
                                </div>
                            </div>
                            <p> {eventData.nombreParticipant} </p>
                        </div>
                        {/* recompense */}
                        <div className='blocIc'>
                            <div className='pageTitleCornersMin'>
                                <div className='pageTitleMin'>
                                    <h1 className='pageTitleContentMin'>Recompense</h1>
                                </div>
                            </div>
                            <p> {eventData.recompense} </p>
                        </div>
                    </div>
                    <div className='blocLinkBtn'>
                        <a href={eventData.liens?.rediffusion} className='normalButton'>REDIFFUSION</a>
                        <a href={eventData.liens?.inscription} className='normalButton'>S'INSCRIRE</a>
                        <a href={eventData.liens?.resultat} className='normalButton'>RESULTAT</a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EventDetails
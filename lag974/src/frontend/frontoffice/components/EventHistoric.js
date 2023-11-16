import React from 'react'

import '../styles/EventHistoric.css';

const formatDate = (dateString) => {
    // Séparation de la date en composants (année, mois, jour)
    const parts = dateString.split('-');
    if (parts.length !== 3) {
        console.error("Format de date incorrect:", dateString);
        return "Date inconnue";
    }

    // Inversion des composants pour obtenir le format jj/mm/aaaa
    return `${parts[2].substring(0, 2)}/${parts[1]}/${parts[0]}`;
};

const EventHistoric = ({ events }) => {
    return (
        <div className="event-list">
            <h3>Historique des événements</h3>
            <ul>
                {events.map((event, index) => (
                    <li key={index}>
                        <span className="event-name">{event.nomEventHistoric}</span>
                        <span className="event-ranking">Top {event.classement}</span>
                        <span className="event-date">
                            {formatDate(event.dateDeDebut)} - {formatDate(event.dateDeFin)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EventHistoric;
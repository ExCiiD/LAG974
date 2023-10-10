import React from 'react'

import '../styles/EventHistoric.css';

const EventHistoric = ({ events }) => {
    return (
        <div className="event-list">
            <h3>Historique des événements</h3>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <span className="event-name">{event.name}</span>
                        <span className="event-ranking">Top {event.ranking}</span>
                        <span className="event-date">{event.startDate} - {event.endDate}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EventHistoric
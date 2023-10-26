import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventComponent = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [eventName, setEventName] = useState("");

    // Charger les événements dès le chargement du composant
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        axios.get('/lagapi/evenements')
            .then(response => {
                if (response.data && Array.isArray(response.data.evenements)) {
                    setEvents(response.data.evenements);
                    console.log(response.data.evenements);
                } else {
                    console.error("La réponse du serveur n'est pas un tableau:", response.data);
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des événements:", error);
            });
    };

    const handleCreateEvent = () => {
        axios.post('/lagapi/evenements', {
            name: eventName
        })
            .then(response => {
                setEventName("");  // Réinitialise le nom de l'événement
                fetchEvents();    // Actualise la liste des événements
                setShowForm(false); // Cache le formulaire
            })
            .catch(error => {
                console.error("Erreur lors de la création de l'événement:", error);
            });
    };

    return (
        <div className="eventContainer">
            {showForm ? (
                <div className="eventForm">
                    <input
                        type="text"
                        placeholder="Nom de l'événement"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                    <button onClick={handleCreateEvent}>Créer l'événement</button>
                    <button onClick={() => setShowForm(false)}>Annuler</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => setShowForm(true)}>Création</button>
                    <ul>
                        {events.map((event, index) => (
                            <li key={index}>{event.nomEvent}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EventComponent;
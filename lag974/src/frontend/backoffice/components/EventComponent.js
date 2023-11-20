import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/List.css';

//images :
import createBtn from '../images/createBtn.png';
import updateBtn from '../images/updateBtn.png';
import deleteBtn from '../images/deleteBtn.png';


const EventComponent = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingEventId, setEditingEventId] = useState(null);
    const [eventData, setEventData] = useState({
        nomEvent: '',
        dateDebut: '',
        dateFin: '',
        jeuEvenement: '',
        description: '',
        thumbnailEvent: '',
        typeTournoi: 'online',
        liens: {
            inscription: '',
            resultat: '',
            rediffusion: '',
        },
        recompense: '',
        nombreParticipants: '',
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('/lagapi/evenements');
            if (Array.isArray(response.data.evenements)) {
                setEvents(response.data.evenements);
            } else {
                console.error("Ce n'est pas un tableau:", response.data);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    //FONCTIONS DE CHANGEMENT D'ETATS DES INPUTS
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleLinkChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({
            ...prevState,
            liens: {
                ...prevState.liens,
                [name]: value
            }
        }));
    }
    //FONCTION POUR FORCER LA REINITILISATION DU FORMULAIRE
    const handleShowCreateForm = () => {
        setEventData({
            nomEvent: '',
            dateDebut: '',
            dateFin: '',
            jeuEvenement: '',
            description: '',
            thumbnailEvent: '',
            typeTournoi: 'online',
            liens: {
                inscription: '',
                resultat: '',
                rediffusion: '',
            },
            recompense: '',
            nombreParticipants: '',
        });
        setEditingEventId(null);
        setShowForm(true);
    };

    //GESTION DES FORMATS DE DATES
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        let month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    };

    // Fonction pour créer un événement à l'appui d'un bouton
    const handleCreateEvent = async (newEventData) => {

        try {
            const response = await axios.post('/lagapi/evenements', newEventData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchEvents();
            setShowForm(false);
            console.log('Event created', response.data);
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        // Demander une confirmation avant de procéder
        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?");

        if (isConfirmed) {
            try {
                // Obtenir les détails de l'événement pour vérifier si une image est associée
                const eventResponse = await axios.get(`/lagapi/evenements/${eventId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const event = eventResponse.data;

                // Supprimer l'image si elle existe
                if (event.thumbnailEvent) {
                    await axios.delete(`/upload/evenements/${eventId}/thumbnailEvent`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log('Image de l\'événement supprimée');
                }

                // Supprimer l'événement
                await axios.delete(`/lagapi/evenements/${eventId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Événement supprimé');

                // Rafraîchir la liste des événements après la suppression
                fetchEvents();
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'événement ou de son image:', error.response.data);
            }
        } else {
            console.log('Suppression annulée');
        }
    };

    //fonction pour afficher les donnée de l'evenement a modifier
    const handleUpdateEvent = (eventId) => {
        axios.get(`/lagapi/evenements/${eventId}`)
            .then(response => {
                setEditingEventId(eventId);
                setEventData(response.data.evenement);
                console.log(response.data.evenement);
                setShowForm(true);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données de l\'événement:', error);
            });
    }

    //fonction pour mupdate un evenement
    const handleActualUpdate = async (eventId, updatedEventData, imageUrl) => {
        // Si une nouvelle image est uploadée, on utilise son URL, sinon on garde celle du state
        const eventDataWithImage = imageUrl ? { ...updatedEventData, thumbnailEvent: imageUrl } : updatedEventData;

        try {
            await axios.put(`/lagapi/evenements/${eventId}`, eventDataWithImage, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchEvents();
            setShowForm(false);
            setEditingEventId(null);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Préparer les données du formulaire
        const formData = new FormData();

        // Vérifier si eventData.thumbnailEvent est un fichier
        const isFile = eventData.thumbnailEvent instanceof File;

        let imageUrl = eventData.thumbnailEvent;
        // Si c'est un fichier et qu'il s'agit d'une mise à jour, procéder à l'upload
        if (isFile && editingEventId) {
            // Définir le point de terminaison pour l'upload
            const uploadEndpoint = `/upload/evenements/${editingEventId}/thumbnailEvent`;

            formData.append('image', eventData.thumbnailEvent);

            try {
                // Effectuer la requête d'upload
                const uploadResponse = await axios.post(uploadEndpoint, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                });
                imageUrl = uploadResponse.data.imageUrl; // Mettre à jour l'URL de l'image avec la réponse du serveur
            } catch (uploadError) {
                console.error('Error uploading file:', uploadError);
                return; // Sortir en cas d'échec de l'upload
            }
        }

        // Préparer l'objet eventData avec l'URL de l'image mise à jour si nécessaire
        const eventDataWithImage = { ...eventData, thumbnailEvent: imageUrl };

        // Si il y'a un eventId, cela signifie que nous mettons à jour un événement
        if (editingEventId) {
            await handleActualUpdate(editingEventId, eventDataWithImage);
        } else {
            await handleCreateEvent(eventData);
        }
    };

    const imagePreview = eventData.thumbnailEvent instanceof File ? URL.createObjectURL(eventData.thumbnailEvent) : eventData.thumbnailEvent;

    return (
        <div className="eventContainer">
            {showForm ? (
                <form className="backForm" onSubmit={handleSubmit}>
                    <input className='backFormInput' name="nomEvent" value={eventData?.nomEvent || ''} onChange={handleInputChange} placeholder="Nom de l'événement" />
                    <input className='backFormInput' type="date" name="dateDebut" value={eventData.dateDebut ? formatDate(eventData.dateDebut) : ''} onChange={handleInputChange} />
                    <input className='backFormInput' type="date" name="dateFin" value={eventData.dateFin ? formatDate(eventData.dateFin) : ''} onChange={handleInputChange} />
                    <input className='backFormInput' name="jeuEvenement" value={eventData?.jeuEvenement || ''} onChange={handleInputChange} placeholder="Jeu de l'événement" />
                    <textarea className='backFormInput' name="description" value={eventData?.description || ''} onChange={handleInputChange} placeholder="Description" />
                    {editingEventId ? (
                        <>
                            {imagePreview && (
                                <img src={imagePreview} alt="Aperçu" style={{ width: '100px', height: '100px' }} />
                            )}
                            <input className='backFormInput' type="file" name="thumbnailEvent" onChange={(e) => setEventData({ ...eventData, thumbnailEvent: e.target.files[0] })} placeholder="URL thumbnailEvent" />
                        </>
                    ) : (
                        <p>Veuillez créer l'événement sans image, puis modifiez le pour pouvoir en mettre une.</p>
                    )}
                    <select className='backFormInput' name="typeTournoi" value={eventData?.typeTournoi || ''} onChange={handleInputChange}>
                        <option value="online">Online</option>
                        <option value="lan">LAN</option>
                    </select>
                    <input className='backFormInput' name="inscription" value={eventData.liens?.inscription || ''} onChange={handleLinkChange} placeholder="Lien d'inscription" />
                    <input className='backFormInput' name="resultat" value={eventData.liens?.resultat || ''} onChange={handleLinkChange} placeholder="Lien des résultats" />
                    <input className='backFormInput' name="rediffusion" value={eventData.liens?.rediffusion || ''} onChange={handleLinkChange} placeholder="Lien de rediffusion" />
                    <input className='backFormInput' name="recompense" value={eventData?.recompense || ''} onChange={handleInputChange} placeholder="Récompense" />
                    <input className='backFormInput' type="number" name="nombreParticipants" value={eventData?.nombreParticipants || ''} onChange={handleInputChange} placeholder="Nombre de participants" />
                    <div className='backFormBtnContainer'>
                        <button type='submit' className='backFormBtn' >
                            {editingEventId ? 'Mettre à jour' : 'Créer'}
                        </button>

                        <button type='button' className='backFormBtn' onClick={() => {
                            setShowForm(false);
                            setEditingEventId(null);
                        }}>
                            Annuler
                        </button>

                    </div>
                </form>
            ) : (
                <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>NOM</th>
                                    <th>DATE DE DÉBUT</th>
                                    <th>DATE DE FIN</th>
                                    <th>
                                        <button onClick={handleShowCreateForm}><img src={createBtn} alt='create Button' /></button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event, index) => (
                                    <tr key={index}>
                                        <td>{event.nomEvent}</td>
                                        <td>{formatDate(event.dateDebut)}</td>
                                        <td>{formatDate(event.dateFin)}</td>
                                        <td>
                                            <button onClick={() => handleUpdateEvent(event._id)}><img src={updateBtn} alt='update Button' /></button>
                                            <button onClick={() => handleDeleteEvent(event._id)}><img src={deleteBtn} alt='delete button' /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            )}
        </div>
    );
};

export default EventComponent;
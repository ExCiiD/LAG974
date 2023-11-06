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
        thumbnail: '',
        typeTournoi: 'online',
        liens: {
            inscription: '',
            resultat: '',
            rediffusion: '',
        },
        recompense: '',
        nombreParticipants: '',
    });

    const [token] = useState(localStorage.getItem('token'));

    const [imagePreview, setImagePreview] = useState(null);


    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (editingEventId) {
            // Supposons que votre API renvoie l'URL de l'image sous `event.thumbnail`
            setImagePreview(eventData.thumbnail);
        }
    }, [editingEventId, eventData.thumbnail]);

    useEffect(() => {
        // Lorsque le composant est démonté ou que l'image change, libérez l'ancienne URL d'objet
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('/lagapi/evenements');
            if (Array.isArray(response.data.evenements)) {
                setEvents(response.data.evenements);
            } else {
                console.error("Server response is not an array:", response.data);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            // Créez une URL d'objet pour le fichier sélectionné
            setImagePreview(URL.createObjectURL(file));
        }
    };


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

    const handleShowCreateForm = () => {
        setEventData({
            nomEvent: '',
            dateDebut: '',
            dateFin: '',
            jeuEvenement: '',
            description: '',
            thumbnail: '',
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

    // Fonction pour créer un événement à l'appui d'un bouton
    const handleCreateEvent = async (eventData) => {
        try {
            const response = await axios.post('/lagapi/evenements', eventData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchEvents();
            setShowForm(false);
            console.log('Event created', response);
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };



    //fonction pour supprimer un evenementr a l'appui de bouton
    const handleDeleteEvent = (eventId) => {
        axios.delete(`/lagapi/evenements/${eventId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Événement supprimé', response);
                fetchEvents();    // Rafraîchir la liste des événements après la suppression
            })
            .catch(error => {
                console.error('Erreur lors de la suppression', error.response.data);
            });
    }

    //fonction pour modfier un evenement a l'appui de bouon
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

    const handleActualUpdate = async (eventId, imageUrl) => {
        // Préparer les données, y compris l'URL de l'image
        const updatedEventData = {
            ...eventData,
            thumbnail: imageUrl,
        };

        // On convertit les données en FormData pour pouvoir inclure le fichier si nécessaire
        const formData = new FormData();
        for (const key in updatedEventData) {
            if (key !== 'thumbnail' || imageUrl !== eventData.thumbnail) {
                formData.append(key, updatedEventData[key]);
            }
        }
        // Pour les objets imbriqués comme `liens`, il faut les convertir en chaîne JSON
        formData.append('liens', JSON.stringify(updatedEventData.liens));

        try {
            const response = await axios.put(`/lagapi/evenements/${eventId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchEvents();
            setShowForm(false);
            setEditingEventId(null);
            console.log('Event updated', response);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Si on modifie et qu'une nouvelle image n'a pas été téléchargée
        // on envoie les données actuelles
        if (editingEventId && !eventData.thumbnail.name) {
            await handleActualUpdate(editingEventId);
            return;
        }

        const formData = new FormData();
        if (eventData.thumbnail.name) {
            formData.append('thumbnail', eventData.thumbnail);
        }

        try {
            let imageUrl = imagePreview; // Utilisez l'image actuelle par défaut
            if (eventData.thumbnail.name) {
                const uploadResponse = await axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                });
                imageUrl = uploadResponse.data.imageUrl;
            }

            await handleCreateEvent({ ...eventData, thumbnail: imageUrl });
        } catch (error) {
            console.error('Error submitting event:', error);
        }
    };


    //fonction pour rendre la date au format jj/mm/aaaa
    function formatDate(dateString) {
        const [year, month, day] = dateString.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    }


    return (
        <div className="eventContainer">
            {showForm ? (
                <form className="backForm" onSubmit={handleSubmit}>
                    <input className='backFormInput' name="nomEvent" value={eventData?.nomEvent || ''} onChange={handleInputChange} placeholder="Nom de l'événement" />
                    <input className='backFormInput' type="date" name="dateDebut" value={eventData?.dateDebut || ''} onChange={handleInputChange} />
                    <input className='backFormInput' type="date" name="dateFin" value={eventData?.dateFin || ''} onChange={handleInputChange} />
                    <input className='backFormInput' name="jeuEvenement" value={eventData?.jeuEvenement || ''} onChange={handleInputChange} placeholder="Jeu de l'événement" />
                    <textarea className='backFormInput' name="description" value={eventData?.description || ''} onChange={handleInputChange} placeholder="Description" />
                    {imagePreview && (
                        <img src={imagePreview} alt="Aperçu" style={{ width: '100px', height: '100px' }} />
                    )}
                    <input className='backFormInput' type="file" name="thumbnail" onChange={handleFileChange} placeholder="URL Thumbnail" />
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
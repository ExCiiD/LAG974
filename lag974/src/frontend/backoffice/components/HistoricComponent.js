import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/List.css';

//images :
import createBtn from '../images/createBtn.png';
import updateBtn from '../images/updateBtn.png';
import deleteBtn from '../images/deleteBtn.png';

const HistoricComponent = ({ gameId }) => {
    const [historic, sethistoric] = useState([]);
    const [historicId, sethistoricId] = useState();
    const [showAddEventForm, setShowAddEventForm] = useState(false);
    const [editingEventId, setEditingEventId] = useState(null);

    const token = localStorage.getItem('token');

    const fetchEvents = useCallback(() => {
        axios.get(`/lagapi/historiques/${gameId}`)
            .then(response => {
                console.log(response.data);
                sethistoric(response.data.evenements);
                sethistoricId(response.data._id);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de l'historique:", error);
            });
    }, [gameId]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);
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

    //GESTION D AFFICHAGE DU FORMULAIRE
    const toggleAddEventForm = (event = null) => {
        if (event) {
            // Si un événement est passé, pré-remplissez le formulaire avec ses données et définissez l'ID de l'événement en cours de modification
            setFormValues(event);
            setEditingEventId(event._id);
        } else {
            // Réinitialisez le formulaire s'il est annulé ou après une mise à jour réussie
            setFormValues({
                nomEventHistoric: '',
                dateDeDebut: '',
                dateDeFin: '',
                classement: '',
                nombreEquipes: '',
            });
            setEditingEventId(null);
        }
        setShowAddEventForm(!showAddEventForm);
    };

    //FONCTION POUR L AJOUT D EVENEMENT
    const addEventToHistoric = (eventData) => {
        axios.post(`/lagapi/historiques/${historicId}/event`, eventData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                fetchEvents();
                setShowAddEventForm(false);
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout de l'événement:", error);
            });
    };
    //FONCTION POUR LA MODIFICATION D EVENEMENT
    const updateEventInHistoric = (eventData) => {
        axios.put(`/lagapi/historiques/${historicId}/event/${editingEventId}`, eventData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                fetchEvents();
                toggleAddEventForm();
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de l'événement:", error);
            });
    };
    //FONCTION POUR LA SUPPRESSION D EVENEMENT
    const deleteEventHistoric = (eventId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
            axios.delete(`/lagapi/historiques/${historicId}/event/${eventId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log('Événement supprimé:', response.data);
                    // Mettez à jour l'état pour supprimer l'événement de l'interface utilisateur
                    sethistoric(prevHistoric => prevHistoric.filter(event => event._id !== eventId));
                })
                .catch(error => {
                    console.error("Erreur lors de la suppression de l'événement:", error);
                });
        }
    }
    //FONCTION POUR L'ENVOI DE DONNEES (SUBMIT)
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const eventData = {};
        formData.forEach((value, key) => {
            eventData[key] = value;
        });

        if (editingEventId) {
            updateEventInHistoric(eventData);
        } else {
            addEventToHistoric(eventData);
        }
    };

    //GESTION D'AFFICHAGE ET MODIFICATIONS DE DONNEES 
    const [historicData, setFormValues] = useState({
        nomEventHistoric: '',
        dateDeDebut: '',
        dateDeFin: '',
        classement: '',
        nombreEquipes: '',
    });

    // Gestionnaire onChange pour mettre à jour formValues
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    return (
        <div className="historicContainer">
            {showAddEventForm ? (
                <form className="backForm" onSubmit={handleSubmit}>
                    <input className='backFormInput' type="text" name="nomEventHistoric" value={historicData?.nomEventHistoric || ''} onChange={handleInputChange} placeholder="Nom de l'evenement" required />
                    <input className='backFormInput' type="date" name="dateDeDebut" value={historicData?.dateDeDebut ? formatDate(historicData.dateDeDebut) : ''} onChange={handleInputChange} placeholder="Date de début" required />
                    <input className='backFormInput' type="date" name="dateDeFin" value={historicData?.dateDeFin ? formatDate(historicData.dateDeFin) : ''} onChange={handleInputChange} placeholder="Date de fin" />
                    <input className='backFormInput' type="number" name="classement" value={historicData?.classement || ''} onChange={handleInputChange} placeholder="Classement" required />
                    <input className='backFormInput' type="number" name="nombreEquipes" value={historicData?.nombreEquipes || ''} onChange={handleInputChange} placeholder="Nombre d'equipes" required />
                    <div className='backFormBtnCtnr'>
                        <button className='backFormBtn' type="submit">{editingEventId ? 'Modifier l\'événement' : 'Ajouter Événement'}</button>
                        <button className='backFormBtn' type="button" onClick={toggleAddEventForm}>Annuler</button>
                    </div>
                </form>
            ) : (
                <div className='rosterContentcontainer'>
                    <table className='listeEvenementsHistorique'>
                        <thead>
                            <tr>
                                <th>NOM</th>
                                <th><button onClick={toggleAddEventForm}><img src={createBtn} alt='bouton ajouter evenement' /></button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {historic.map((event, index) => (
                                <tr key={index}>
                                    <td>{event.nomEventHistoric}</td>
                                    <td>
                                        <button><img src={updateBtn} onClick={() => toggleAddEventForm(event)} alt='update button' /></button>
                                        <button><img src={deleteBtn} onClick={() => deleteEventHistoric(event._id)} alt='delete button' /></button>
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

export default HistoricComponent;

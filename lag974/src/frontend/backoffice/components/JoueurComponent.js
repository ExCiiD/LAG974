import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/List.css';

//images :
import createBtn from '../images/createBtn.png';
import updateBtn from '../images/updateBtn.png';
import deleteBtn from '../images/deleteBtn.png';

const JoueurComponent = () => {
    const [joueurs, setJoueurs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingJoueur, setEditingJoueur] = useState(null);

    const token = localStorage.getItem('token'); // Récupérer le token du local storage

    useEffect(() => {
        fetchJoueurs();
    }, []);

    const fetchJoueurs = () => {
        axios.get('/lagapi/joueurs')
            .then(response => {
                if (response.data && Array.isArray(response.data.joueurs)) {
                    setJoueurs(response.data.joueurs);
                } else {
                    console.error("La réponse du serveur n'est pas un tableau:", response.data);
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des joueurs:", error);
            });
    };

    const [joueurData, setJoueurData] = useState({
        nomJoueur: '',
        prenomJoueur: '',
        pseudoJoueur: '',
        dateDeNaissanceJoueur: '',
        liensReseauxJoueur: {
            insta: '',
            twitch: '',
            youtube: '',
            twitter: ''
        },
        photoJoueur: ''
        // Ajoutez ici d'autres champs si nécessaire
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("liensReseauxJoueur.")) {
            const key = name.split(".")[1];
            setJoueurData(prevState => ({
                ...prevState,
                liensReseauxJoueur: {
                    ...prevState.liensReseauxJoueur,
                    [key]: value
                }
            }));
        } else {
            setJoueurData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleCreateJoueur = () => {
        axios.post('/lagapi/joueurs', joueurData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                fetchJoueurs();
                setShowForm(false);
            })
            .catch(error => {
                console.error("Erreur lors de la création du joueur:", error);
            });
    };

    const handleUpdateJoueur = (id) => {
        axios.get(`/lagapi/joueurs/${id}`)
            .then(response => {
                setJoueurData(response.data);
                setEditingJoueur(id);
                setShowForm(true);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données du joueur:', error);
            });
    }

    const handleActualUpdate = (id) => {
        axios.put(`/lagapi/joueurs/${id}`, joueurData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                fetchJoueurs();
                setShowForm(false);
                setEditingJoueur(null); // Réinitialisez l'état d'édition
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour du joueur:', error);
            });
    }

    const handleDeleteJoueur = (id) => {
        axios.delete(`/lagapi/joueurs/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                fetchJoueurs();
            })
            .catch(error => {
                console.error('Erreur lors de la suppression', error);
            });
    }

    return (
        <div className="joueurContainer">
            {showForm ? (
                <div className="backForm">
                    <input className='backFormInput' name="nomJoueur" value={joueurData?.nomJoueur || ''} onChange={handleInputChange} placeholder="Nom du joueur" />
                    <input className='backFormInput' name="prenomJoueur" value={joueurData?.prenomJoueur || ''} onChange={handleInputChange} placeholder="Prénom du joueur" />
                    <input className='backFormInput' name="pseudoJoueur" value={joueurData?.pseudoJoueur || ''} onChange={handleInputChange} placeholder="Pseudo du joueur" />
                    <input className='backFormInput' type="date" name="dateDeNaissanceJoueur" value={joueurData?.dateDeNaissanceJoueur || ''} onChange={handleInputChange} placeholder="Date de naissance" />

                    {/* Liens réseaux sociaux */}
                    <input className='backFormInput' name="liensReseauxJoueur.insta" value={joueurData?.liensReseauxJoueur.insta || ''} onChange={handleInputChange} placeholder="Instagram" />
                    <input className='backFormInput' name="liensReseauxJoueur.twitch" value={joueurData?.liensReseauxJoueur.twitch || ''} onChange={handleInputChange} placeholder="Twitch" />
                    <input className='backFormInput' name="liensReseauxJoueur.youtube" value={joueurData?.liensReseauxJoueur.youtube || ''} onChange={handleInputChange} placeholder="YouTube" />
                    <input className='backFormInput' name="liensReseauxJoueur.twitter" value={joueurData?.liensReseauxJoueur.twitter || ''} onChange={handleInputChange} placeholder="Twitter" />

                    {/* Photo du joueur */}
                    <input className='backFormInput' name="photoJoueur" value={joueurData?.photoJoueur || ''} onChange={handleInputChange} placeholder="URL de la photo" />

                    {/* Equipe */}
                    <input className='backFormInput' name="equipe" value={joueurData?.equipe || ''} onChange={handleInputChange} placeholder="ID de l'équipe" />
                    <div className='backFormBtnContainer'>
                        <button className='backFormBtn' onClick={editingJoueur ? () => handleActualUpdate(editingJoueur) : handleCreateJoueur}>
                            {editingJoueur ? 'Mettre à jour' : 'Créer'}
                        </button>
                        <button className='backFormBtn' onClick={() => {
                            setShowForm(false);
                            setEditingJoueur(null);
                        }}>
                            Annuler
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>NOM</th>
                                <th>PSEUDO</th>
                                <th>EQUIPE</th>
                                <th><button onClick={() => setShowForm(true)}><img src={createBtn} alt='create Button' /></button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {joueurs.map((joueur, index) => (
                                <tr key={index}>
                                    <td>{joueur.nomJoueur}</td>
                                    <td>{joueur.pseudoJoueur}</td>
                                    <td>{joueur.equipe}</td>
                                    <td>
                                        <button onClick={() => handleUpdateJoueur(joueur._id)}><img src={updateBtn} alt='update Button' /></button>
                                        <button onClick={() => handleDeleteJoueur(joueur._id)}><img src={deleteBtn} alt='delete button' /></button>
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

export default JoueurComponent;


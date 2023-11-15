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
    const [joueurData, setJoueurData] = useState({
        nomJoueur: '',
        prenomJoueur: '',
        pseudoJoueur: '',
        dateDeNaissanceJoueur: '',
        liensReseauxJoueur: {
            insta: '',
            twitch: '',
            youtube: '',
            twitter: '',
        },
        photoJoueur: '',
        equipe: '',
    });

    const token = localStorage.getItem('token'); // Récupérer le token du local storage

    useEffect(() => {
        fetchJoueurs();
    }, []);

    const fetchJoueurs = () => {
        axios.get('/lagapi/joueurs')
            .then(async response => {
                if (response.data && Array.isArray(response.data.joueurs)) {
                    const joueursAvecNomJeu = await Promise.all(response.data.joueurs.map(async joueur => {
                        if (joueur.equipe) {
                            // Récupérer les détails de l'équipe
                            const equipeResponse = await axios.get(`/lagapi/equipes/id/${joueur.equipe}`);
                            const equipe = equipeResponse.data;

                            if (equipe.jeu) {
                                // Récupérer les détails du jeu
                                const jeuResponse = await axios.get(`/lagapi/jeux/${equipe.jeu}`);
                                const jeu = jeuResponse.data;
                                return { ...joueur, nomJeu: jeu.nomJeu };
                            }
                        }
                        return joueur;
                    }));

                    setJoueurs(joueursAvecNomJeu);
                } else {
                    console.error("La réponse du serveur n'est pas un tableau:", response.data);
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des joueurs:", error);
            });
    };


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

    const handleCreateButtonClick = () => {
        setJoueurData({
            nomJoueur: '',
            prenomJoueur: '',
            pseudoJoueur: '',
            dateDeNaissanceJoueur: '',
            liensReseauxJoueur: {
                insta: '',
                twitch: '',
                youtube: '',
                twitter: '',
            },
            photoJoueur: '',
        });
        setEditingJoueur(null);
        setShowForm(true);
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

    const handleActualUpdate = async (joueurId) => {
        let updatedJoueurData = { ...joueurData };

        // Vérifiez si un nouveau fichier a été sélectionné pour l'upload
        if (joueurData.photoJoueur instanceof File) {
            const formData = new FormData();
            formData.append('image', joueurData.photoJoueur);

            try {
                const uploadResponse = await axios.post(`/upload/joueurs/${joueurId}/photoJoueur`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                // Mettez à jour l'URL de l'image dans les données du joueur
                updatedJoueurData.photoJoueur = uploadResponse.data.imageUrl;
            } catch (error) {
                console.error('Erreur lors de l\'upload de l\'image:', error);
                return;
            }
        }

        // Mettez à jour les données du joueur
        try {
            await axios.put(`/lagapi/joueurs/${joueurId}`, updatedJoueurData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchJoueurs();
            setShowForm(false);
            setEditingJoueur(null);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du joueur:', error);
        }
    };

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

    const imagePreview = joueurData.photoJoueur instanceof File ? URL.createObjectURL(joueurData.photoJoueur) : joueurData.photoJoueur;

    return (
        <div className="joueurContainer">
            {showForm ? (
                <div className="backForm">
                    <input className='backFormInput' name="nomJoueur" value={joueurData?.nomJoueur || ''} onChange={handleInputChange} placeholder="Nom du joueur" />
                    <input className='backFormInput' name="prenomJoueur" value={joueurData?.prenomJoueur || ''} onChange={handleInputChange} placeholder="Prénom du joueur" />
                    <input className='backFormInput' name="pseudoJoueur" value={joueurData?.pseudoJoueur || ''} onChange={handleInputChange} placeholder="Pseudo du joueur" />
                    <input className='backFormInput' type="date" name="dateDeNaissanceJoueur" value={joueurData?.dateDeNaissanceJoueur ? formatDate(joueurData.dateDeNaissanceJoueur) : ''} onChange={handleInputChange} placeholder="Date de naissance" />

                    {/* Liens réseaux sociaux */}
                    <input className='backFormInput' name="liensReseauxJoueur.insta" value={joueurData?.liensReseauxJoueur.insta || ''} onChange={handleInputChange} placeholder="Instagram" />
                    <input className='backFormInput' name="liensReseauxJoueur.twitch" value={joueurData?.liensReseauxJoueur.twitch || ''} onChange={handleInputChange} placeholder="Twitch" />
                    <input className='backFormInput' name="liensReseauxJoueur.youtube" value={joueurData?.liensReseauxJoueur.youtube || ''} onChange={handleInputChange} placeholder="YouTube" />
                    <input className='backFormInput' name="liensReseauxJoueur.twitter" value={joueurData?.liensReseauxJoueur.twitter || ''} onChange={handleInputChange} placeholder="Twitter" />

                    {editingJoueur ? (
                        <>
                            {imagePreview && (
                                <img src={imagePreview} alt="Aperçu" style={{ width: '100px', height: '100px' }} />
                            )}
                            <input className='backFormInput' type="file" name="photoJoueur" onChange={(e) => setJoueurData({ ...joueurData, photoJoueur: e.target.files[0] })} placeholder="URL de la photo" />
                        </>
                    ) : (
                        <p>Veuillez créer l'événement sans image, puis modifiez le pour pouvoir en mettre une.</p>
                    )}
                    {/* Equipe */}
                    {!editingJoueur && (
                        <input className='backFormInput' name="equipe" value={joueurData?.equipe || ''} onChange={handleInputChange} placeholder="ID de l'équipe" />
                    )}
                    <div className='backFormBtnContainer'>
                        <button className='backFormBtn' onClick={editingJoueur ? () => handleActualUpdate(editingJoueur) : handleCreateJoueur}>
                            {editingJoueur ? 'Mettre à jour' : 'Créer'}
                        </button>
                        <button className='backFormBtn' onClick={() => { setShowForm(false); setEditingJoueur(null); }}>
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
                                    <th><button onClick={handleCreateButtonClick}><img src={createBtn} alt='create Button' /></button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {joueurs.map((joueur, index) => (
                                <tr key={index}>
                                    <td>{joueur.nomJoueur}</td>
                                    <td>{joueur.pseudoJoueur}</td>
                                    <td>{joueur.nomJeu || 'Non assigné'}</td>
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


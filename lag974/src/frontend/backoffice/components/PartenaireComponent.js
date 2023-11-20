import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/List.css';
import '../styles/PartenaireComponent.css';
import createBtn from '../images/createBtn.png';
import updateBtn from '../images/updateBtn.png';
import deleteBtn from '../images/deleteBtn.png';

const PartenaireComponent = () => {
    const [partenaires, setPartenaires] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingPartenaire, setEditingPartenaire] = useState(null);
    const initialPartenaireData = {
        nomPartenaire: '',
        logoPartenaire: '',
        lienSitePartenaire: '',
    };
    const [partenaireData, setPartenaireData] = useState(initialPartenaireData);
    const token = localStorage.getItem('token');

    const fetchPartenaires = useCallback(() => {
        axios.get('/lagapi/partenaires')
            .then(response => {
                if (response.data && Array.isArray(response.data.partenaires)) {
                    setPartenaires(response.data.partenaires);
                } else {
                    console.error("La réponse du serveur n'est pas un tableau:", response.data);
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des partenaires:", error);
            });
    }, []);

    useEffect(() => {
        fetchPartenaires();
    }, [fetchPartenaires]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPartenaireData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setPartenaireData(prevState => ({
            ...prevState,
            [name]: files[0] // Prend le premier fichier
        }));
    };

    const resetForm = () => {
        setPartenaireData(initialPartenaireData);
        setEditingPartenaire(null);
    };

    const handleCreateButtonClick = () => {
        resetForm();
        setShowForm(true);
    };

    const handleDeletePartenaire = useCallback(async (id) => {
        // Demander une confirmation avant de procéder
        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce partenaire ?");

        if (isConfirmed) {
            try {
                // Obtenir les détails du partenaire pour vérifier si une image est associée
                const partenaireResponse = await axios.get(`/lagapi/partenaires/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const partenaire = partenaireResponse.data;

                // Supprimer l'image si elle existe
                if (partenaire.logoPartenaire) {
                    await axios.delete(`/upload/partenaires/${id}/logoPartenaire`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log('Image du partenaire supprimée');
                }

                // Supprimer le partenaire
                await axios.delete(`/lagapi/partenaires/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Partenaire supprimé');

                // Rafraîchir la liste des partenaires après la suppression
                fetchPartenaires();
            } catch (error) {
                console.error('Erreur lors de la suppression du partenaire ou de son image:', error.response.data);
            }
        }
    }, [fetchPartenaires, token]);

    const handleUpdatePartenaire = useCallback((partenaire) => {
        setEditingPartenaire(partenaire);
        setShowForm(true);
    }, []);

    useEffect(() => {
        if (editingPartenaire) {
            setPartenaireData({
                nomPartenaire: editingPartenaire.nomPartenaire,
                logoPartenaire: editingPartenaire.logoPartenaire,
                lienSitePartenaire: editingPartenaire.lienSitePartenaire,
            });
        } else {
            setPartenaireData({ nomPartenaire: '', logoPartenaire: '', lienSitePartenaire: '' });
        }
    }, [editingPartenaire]);

    const handleSubmit = async () => {
        let formData = new FormData();
        let isFile = partenaireData.logoPartenaire instanceof File;

        if (isFile) {
            formData.append('image', partenaireData.logoPartenaire);
        }

        let imageUrl = partenaireData.logoPartenaire;
        if (isFile || editingPartenaire) {
            try {
                const uploadResponse = await axios.post(`/upload/partenaires/${editingPartenaire._id}/logoPartenaire`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                });
                imageUrl = uploadResponse.data.imageUrl;
            } catch (uploadError) {
                console.error('Error uploading file:', uploadError);
                return;
            }
        }

        const partenaireDataWithImage = { ...partenaireData, logoPartenaire: imageUrl };

        if (editingPartenaire) {
            // Update logic
            axios.put(`/lagapi/partenaires/${editingPartenaire._id}`, partenaireDataWithImage, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(() => {
                    // Refresh the list of partenaires to reflect the update
                    fetchPartenaires();
                    // Reset the form and close it
                    setPartenaireData({ nomPartenaire: '', logoPartenaire: '', lienSitePartenaire: '' });
                    setEditingPartenaire(null);
                    setShowForm(false);
                })
                .catch(error => {
                    console.error("Erreur lors de la mise à jour du partenaire:", error);
                    // Optionally, handle error states here (like displaying a message to the user)
                });
        } else {
            // Create logic
            axios.post('/lagapi/partenaires', partenaireData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(() => {
                    // Refresh the list of partenaires to include the new one
                    fetchPartenaires();
                    // Reset the form
                    setPartenaireData({ nomPartenaire: '', logoPartenaire: '', lienSitePartenaire: '' });
                    setShowForm(false);
                })
                .catch(error => {
                    console.error("Erreur lors de la création du partenaire:", error);
                    // Optionally, handle error states here
                });
        }
    };

    const imagePreview = partenaireData.logoPartenaire instanceof File ? URL.createObjectURL(partenaireData.logoPartenaire) : partenaireData.logoPartenaire;

    return (
        <div className="partenaireContainer">
            {showForm ? (
                <div className="backForm">
                    <input
                        className='backFormInput'
                        name="nomPartenaire"
                        value={partenaireData.nomPartenaire}
                        onChange={handleInputChange}
                        placeholder="Nom du partenaire"
                    />
                    {editingPartenaire ? (
                        <>
                            {imagePreview && (
                                <img src={imagePreview} alt="Aperçu" style={{ width: '100px', height: '100px' }} />
                            )}
                    <input
                        className='backFormInput'
                                type="file"
                        name="logoPartenaire"
                                onChange={handleFileChange}
                                placeholder="Logo du partenaire"
                    />
                        </>
                    ) : (
                        <p>Veuillez créer l'événement sans image, puis modifiez le pour pouvoir en mettre une.</p>
                    )}
                    <input
                        className='backFormInput'
                        type="url"
                        name="lienSitePartenaire"
                        value={partenaireData.lienSitePartenaire}
                        onChange={handleInputChange}
                        placeholder="Lien vers le site du partenaire"
                    />
                    <div className='backFormBtnContainer'>
                        <button className='backFormBtn' onClick={handleSubmit}>
                            {editingPartenaire ? 'Mettre à jour' : 'Créer'}
                        </button>

                        <button className='backFormBtn' onClick={() => setShowForm(false)}>Annuler</button>
                    </div>
                </div>
            ) : (
                <div>
                    <table className='partenaireTable'>
                        <thead>
                            <tr>
                                <th colSpan="2">NOM</th>
                                    <th><button onClick={handleCreateButtonClick}><img src={createBtn} alt='create Button' /></button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {partenaires.map((partenaire, index) => (
                                <tr key={index}>
                                    <td colSpan="2">{partenaire.nomPartenaire}</td>
                                    <td className="actionButtons">
                                        <button onClick={() => handleUpdatePartenaire(partenaire)}><img src={updateBtn} alt='update Button' /></button>
                                        <button onClick={() => handleDeletePartenaire(partenaire._id)}><img src={deleteBtn} alt='delete button' /></button>
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

export default PartenaireComponent;

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
    const [partenaireData, setPartenaireData] = useState({
        nomPartenaire: '',
        logoPartenaire: '',
        lienSitePartenaire: '',
    });

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

    const handleDeletePartenaire = useCallback((id) => {
        axios.delete(`/lagapi/partenaires/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                fetchPartenaires();
            })
            .catch(error => {
                console.error('Erreur lors de la suppression', error);
            });
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

    const handleSubmit = () => {
        if (editingPartenaire) {
            // Update logic
            axios.put(`/lagapi/partenaires/${editingPartenaire._id}`, partenaireData, {
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
                    <input
                        className='backFormInput'
                        type="url"
                        name="logoPartenaire"
                        value={partenaireData.logoPartenaire}
                        onChange={handleInputChange}
                        placeholder="Logo URL du partenaire"
                    />
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
                                <th><button onClick={() => setShowForm(true)}><img src={createBtn} alt='create Button' /></button></th>
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

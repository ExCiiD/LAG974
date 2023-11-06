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
    const [partenaireData, setPartenaireData] = useState({
        nomPartenaire: '',
        logoPartenaire: '',
        lienSitePartenaire: '',
    });

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

    const handleCreatePartenaire = useCallback(() => {
        axios.post('/lagapi/partenaires', partenaireData)
            .then(() => {
                fetchPartenaires();
                setShowForm(false);
            })
            .catch(error => {
                console.error("Erreur lors de la création du partenaire:", error);
            });
    }, [partenaireData, fetchPartenaires]);

    const handleDeletePartenaire = useCallback((id) => {
        axios.delete(`/lagapi/partenaires/${id}`)
            .then(() => {
                fetchPartenaires();
            })
            .catch(error => {
                console.error('Erreur lors de la suppression', error);
            });
    }, [fetchPartenaires]);

    const handleUpdatePartenaire = useCallback((id, partenaireToUpdate) => {
        axios.put(`/lagapi/partenaires/${id}`, partenaireToUpdate)
            .then(() => {
                fetchPartenaires();
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour', error);
            });
    }, [fetchPartenaires]);

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
                        <button className='backFormBtn' onClick={handleCreatePartenaire}>Créer</button>
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
                                        <button onClick={() => handleUpdatePartenaire(partenaire.id, partenaire)}><img src={updateBtn} alt='update Button' /></button>
                                        <button onClick={() => handleDeletePartenaire(partenaire.id)}><img src={deleteBtn} alt='delete button' /></button>
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

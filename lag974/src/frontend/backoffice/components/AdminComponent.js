import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import '../styles/List.css';

//images :
import createBtn from '../images/createBtn.png';
import updateBtn from '../images/updateBtn.png';
import deleteBtn from '../images/deleteBtn.png';

const AdminComponent = () => {
    const [admins, setAdmins] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingAdminId, setEditingAdminId] = useState(null);
    const [renderKey, setRenderKey] = useState(0);

    const token = localStorage.getItem('token');

    const fetchAdmins = useCallback(() => {
        axios.get('/lagapi/admins', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data && Array.isArray(response.data.admins)) {
                    setAdmins(response.data.admins);
                } else {
                    console.error("La réponse du serveur n'est pas un tableau:", response.data);
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des administrateurs:", error);
            });
    }, [token]);

    useEffect(() => {
        fetchAdmins();
    }, [fetchAdmins]);



    const initialAdminData = {
        username: '',
        email: '',
        role: '',
    };

    const [adminData, setAdminData] = useState(initialAdminData);

    const resetForm = () => {
        setAdminData(initialAdminData);
        setEditingAdminId(null);
    };

    const handleCreateButtonClick = () => {
        resetForm();
        setShowForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreateAdmin = () => {
        axios.post('/lagapi/admins', adminData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                fetchAdmins();
                setShowForm(false);
            })
            .catch(error => {
                console.error("Erreur lors de la création de l'administrateur:", error);
            });
    };

    const handleDeleteAdmin = (adminId) => {
        axios.delete(`/lagapi/admins/${adminId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                fetchAdmins();
            })
            .catch(error => {
                console.error('Erreur lors de la suppression', error.response.data);
            });
    }

    const handleUpdateAdmin = (adminId) => {
        axios.get(`/lagapi/admins/${adminId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setEditingAdminId(adminId);
                setAdminData(response.data.admin);
                setRenderKey(prevKey => prevKey + 1);
                setShowForm(true);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données de l\'administrateur:', error);
            });
    }

    const handleActualUpdate = (adminId) => {
        axios.put(`/lagapi/admins/${adminId}`, adminData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                fetchAdmins();
                setShowForm(false);
                setEditingAdminId(null);
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de l\'administrateur:', error);
            });
    };

    return (
        <div className="adminContainer" key={renderKey}>
            {showForm ? (
                <div className="backForm">
                    <input className='backFormInput' name="username" value={adminData?.username || ''} onChange={handleInputChange} placeholder="Nom" />
                    <input className='backFormInput' name="email" value={adminData?.email || ''} onChange={handleInputChange} placeholder="Email" />

                    <div className='backFormBtnContainer'>
                        <button className='backFormBtn' onClick={editingAdminId ? () => handleActualUpdate(editingAdminId) : handleCreateAdmin}>
                            {editingAdminId ? 'Mettre à jour' : 'Créer'}
                        </button>

                        <button className='backFormBtn' onClick={() => {
                            setShowForm(false);
                            setEditingAdminId(null);
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
                                <th>USERNAME</th>
                                <th>ROLE</th>
                                <th>EMAIL</th>
                                <th>
                                        <button onClick={handleCreateButtonClick}><img src={createBtn} alt='create Button' /></button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin, index) => (
                                <tr key={index}>
                                    <td>{admin.username}</td>
                                    <td>{admin.role}</td>
                                    <td>{admin.email}</td>
                                    <td>
                                        <button onClick={() => handleUpdateAdmin(admin._id)}><img src={updateBtn} alt='update Button' /></button>
                                        <button onClick={() => handleDeleteAdmin(admin._id)}><img src={deleteBtn} alt='delete button' /></button>
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

export default AdminComponent;

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/List.css';

//images :
import createBtn from '../images/createBtn.png';
import deleteBtn from '../images/deleteBtn.png';

const RosterComponent = ({ gameId }) => {
    const [idequipe, setIdequipe] = useState(null); 
    const [joueursData, setJoueursData] = useState([]);
    const [showAddPlayer, setShowAddPlayer] = useState(false); 
    const [selectedJoueur, setSelectedJoueur] = useState(null);
    const [allJoueurs, setAllJoueurs] = useState([]); 

    const token = localStorage.getItem('token');

    // Fonction pour récupérer les données du roster
    const fetchRoster = useCallback(() => {
        axios.get(`/lagapi/equipes/jeu/${gameId}`)
            .then(response => {
                setIdequipe(response.data._id);
                Promise.all(response.data.roster.map(joueur => axios.get(`/lagapi/joueurs/${joueur.refJoueur}`)))
                    .then(joueursResponses => {
                        const joueursDetails = joueursResponses.map(joueurResponse => joueurResponse.data);
                        setJoueursData(joueursDetails);
                    })
                    .catch(error => {
                        console.error("Erreur lors de la récupération des détails des joueurs:", error);
                    });
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du roster:", error);
            });
    }, [gameId]);


    useEffect(() => {

        fetchRoster(); // Appel initial pour charger les données

        // Charger tous les joueurs disponibles
        axios.get('/lagapi/joueurs')
            .then(response => {
                const joueursSansEquipe = response.data.joueurs.filter(joueur => joueur.equipe === null);
                setAllJoueurs(joueursSansEquipe);
                if (joueursSansEquipe.length > 0) {
                    setSelectedJoueur(joueursSansEquipe[0]._id); // Set the first player as default
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de la liste des joueurs:", error);
            });
    }, [gameId, fetchRoster]);

    const handleSelectChange = (e) => {
        setSelectedJoueur(e.target.value);
        console.log("Selected Player ID:", e.target.value); // Debugging line
    };

    // Fonction pour basculer l'interface d'ajout de joueur
    const toggleAddPlayerInterface = () => {
        setShowAddPlayer(!showAddPlayer);
    };

    //fonction pour ajouter un joueur au roster
    const ajouterJoueur = () => {
        if (!idequipe) {
            console.error("ID de l'équipe non défini");
            return;
        }
        if (!selectedJoueur) {
            console.error("ID du joueur non défini");
            return;
        }
        axios.post(`/lagapi/equipes/${idequipe}/roster/${selectedJoueur}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data.message);
                fetchRoster(); // Recharger les données du roster
                setShowAddPlayer(false); // Fermer l'interface d'ajout
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout du joueur:", error);
            });
    };

    // Fonction pour retirer un joueur du roster
    const retirerJoueur = (idjoueur) => {
        if (!idequipe) {
            console.error("ID de l'équipe non défini");
            return;
        }
        axios.delete(`/lagapi/equipes/${idequipe}/roster/${idjoueur}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data.message);
                fetchRoster(); // Recharger les données du roster
            })
            .catch(error => {
                console.error("Erreur lors de la suppression du joueur:", error);
            });
    };

    return (
        <div className='rosterContainer'>
            {!showAddPlayer && joueursData ? (
                <div className='rosterContentcontainer'>
                    <table className='listeJoueur'>
                        <thead>
                            <tr>
                                <th>PSEUDO</th>
                                <th><button onClick={toggleAddPlayerInterface}><img src={createBtn} alt='bouton ajouter joueur' /></button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {joueursData.map((joueur, index) => (
                                <tr key={index}>
                                    <td>{joueur.pseudoJoueur}</td>
                                    <td>
                                        <button onClick={() => retirerJoueur(joueur._id)}><img src={deleteBtn} alt='delete button' /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
            {showAddPlayer && (
                <div className="backForm">
                    <h3>Ajouter un nouveau joueur</h3>
                    <select className='backFormInput' value={selectedJoueur} onChange={handleSelectChange}>
                        {allJoueurs.map(j => (
                            <option key={j._id} value={j._id}>{j.pseudoJoueur}</option>
                        ))}
                    </select>
                    <div className='backFormBtnCtnr'>
                    <button className='backFormBtn' onClick={() => ajouterJoueur(gameId, selectedJoueur)}>Ajouter joueur</button>
                    <button className='backFormBtn' onClick={toggleAddPlayerInterface}>Annuler</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RosterComponent;

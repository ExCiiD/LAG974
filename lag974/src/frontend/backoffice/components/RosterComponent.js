import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/List.css';

//images :
import createBtn from '../images/createBtn.png';
import deleteBtn from '../images/deleteBtn.png';

const RosterComponent = ({ gameId }) => {
    const [joueursData, setJoueursData] = useState([]);
    const [showAddPlayer, setShowAddPlayer] = useState(false); // Ajout d'un état pour gérer l'affichage
    const [selectedJoueur, setSelectedJoueur] = useState(null);


    useEffect(() => {
        // Fetch roster data using gameId
        axios.get(`/lagapi/equipes/${gameId}`)
            .then(response => {
                const roster = response.data.roster;
                console.log(roster);
                // poiur chaque joueur, obtenir ses details afin d'afficher son pseudo
                Promise.all(response.data.roster.map(joueur => axios.get(`/lagapi/joueurs/${joueur.refJoueur}`)))
                    .then(joueursResponses => {
                        const joueursDetails = joueursResponses.map(joueurResponse => joueurResponse.data);
                        setJoueursData(joueursDetails);
                        console.log(joueursDetails)
                    })
                    .catch(error => {
                        console.error("Erreur lors de la récupération des détails des joueurs:", error);
                    });
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du roster:", error);
            });
    }, [gameId]);

    //fonction pour ajouter un joueur au roster
    const ajouterJoueur = (idequipe, idjoueur) => {
        axios.post(`/lagapi/equipes/${idequipe}/joueurs/${idjoueur}`)
            .then(response => {
                console.log(response.data.message);
                // Après l'ajout du joueur, rechargez les données ou effectuez d'autres actions nécessaires
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout du joueur:", error);
            });
    };

    // Fonction pour basculer l'interface d'ajout de joueur
    const toggleAddPlayerInterface = () => {
        setShowAddPlayer(!showAddPlayer);
    };

    return (
        <div className='rosterContainer'>
            {!showAddPlayer && joueursData && joueursData.length ? (
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
                                        <button><img src={deleteBtn} alt='delete button' /></button>
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
                    <select className='backFormInput' onChange={e => setSelectedJoueur(e.target.value)}>
                        {joueursData.map(j => (
                            <option key={j._id} value={j._id}>{j.pseudoJoueur}</option>
                        ))}
                    </select>
                    <button className='backFormBtn' onClick={() => ajouterJoueur(gameId, selectedJoueur)}>Ajouter joueur</button>
                    <button className='backFormBtn' onClick={toggleAddPlayerInterface}>Annuler</button>
                </div>
            )}
        </div>
    );
};

export default RosterComponent;

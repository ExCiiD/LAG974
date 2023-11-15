import { useEffect, useState } from 'react';
import axios from 'axios';

import RosterComponent from '../components/RosterComponent.js';
import HistoricComponent from '../components/HistoricComponent.js';
import { GameBar } from '../components/GameBar.js';
import { GameForm } from '../components/GameForm.js';

import '../styles/EquipeComponent.css';
import '../styles/List.css';

// Images :

const EquipeComponent = () => {

    const [games, setGames] = useState([]);
    const [selectedGameId, setSelectedGameId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = () => {
        axios.get('/lagapi/jeux')
            .then(response => {
                if (response.data && Array.isArray(response.data.jeux)) {
                    setGames(response.data.jeux);
                    console.log(response.data.jeux);
                } else {
                    console.error("La réponse du serveur n'est pas un tableau:", response.data);
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des jeux:", error);
            });
    };

    //FONCTION POUR GERER LA SELECTION D'UN JEU 
    const handleSelectGame = (id) => {
        setSelectedGameId(id);
    };


    //FONCTION POUR AFFICHER LE FORMULAIRE DE CREATION DE JEU
    const handleAddGame = () => {
        setShowForm(true);
    };

    //FONCTION POUR NE PLUS AFFICHER LE FORMULAIRE DE CREATION DE JEU
    const handleCancel = () => {
        setShowForm(false);
    };
    //FONCTION POUR CREER UN JEU (SUBMIT)
    const handleCreateGame = (gameData) => {
        axios.post('/lagapi/jeux', gameData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data && response.data.jeu) {
                    // Ajouter le jeu retourné par l'API à la liste des jeux localement
                    setGames(prevGames => [...prevGames, response.data.jeu]);
                } else {
                    console.error("La réponse du serveur n'est pas ce qui est attendu:", response.data);
                }
                // Masquer le formulaire après l'ajout
                setShowForm(false);
            })
            .catch(error => {
                console.error("Erreur lors de la création du jeu:", error);
            });
    };

    const handleUpdateGame = async (gameData, gameId) => {
        let updatedGameData = { ...gameData };

        // Vérifiez si iconeJeu est un fichier
        if (gameData.iconeJeu instanceof File) {
            const formData = new FormData();
            formData.append('image', gameData.iconeJeu);

            try {
                const uploadResponse = await axios.post(`/upload/jeux/${gameId}/iconeJeu`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                updatedGameData.iconeJeu = uploadResponse.data.imageUrl;
            } catch (error) {
                console.error('Erreur lors de l\'upload de l\'icône:', error);
                return;
            }
        }

        // Vérifiez si thumbnailJeu est un fichier
        if (gameData.thumbnailJeu instanceof File) {
            const formData = new FormData();
            formData.append('image', gameData.thumbnailJeu);

            try {
                const uploadResponse = await axios.post(`/upload/jeux/${gameId}/thumbnailJeu`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                updatedGameData.thumbnailJeu = uploadResponse.data.imageUrl;
            } catch (error) {
                console.error('Erreur lors de l\'upload de la vignette:', error);
                return;
            }
        }

        // Mise à jour des données du jeu
        try {
            const response = await axios.put(`/lagapi/jeux/${gameId}`, updatedGameData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) {
                setGames(prevGames => prevGames.map(game =>
                    game._id === gameId ? { ...game, ...response.data } : game
                ));
            } else {
                console.error("La réponse du serveur n'est pas ce qui est attendu:", response.data);
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du jeu:", error);
        }
    };

    //FONCTIONS POUR GERER L UPDATE
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateGameData, setUpdateGameData] = useState({});

    // Function to open update form with selected game data
    const handleOpenUpdateForm = (gameId) => {
        const gameToUpdate = games.find(game => game._id === gameId);
        if (gameToUpdate) {
            setUpdateGameData(gameToUpdate);
            setShowUpdateForm(true);
        }
    };


    //FONCTION POUR GERER LA SUPPRESSION
    const handleDeleteGame = (gameId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette equipe ?")) {
            axios.delete(`/lagapi/jeux/${gameId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(() => {
                    // Mettre à jour l'état pour refléter la suppression
                    setGames(prevGames => prevGames.filter(game => game._id !== gameId));
                    setSelectedGameId(null);
                    setSelectedComponent(null);
                })
                .catch(error => {
                    console.error("Erreur lors de la suppression du jeu:", error);
                });
        }
    };

    // Fonction pour afficher le composant Roster ou Historique
    const handleShowComponent = (componentName) => {
        setSelectedComponent(componentName);
    };

    return (
        <div className='equipeContainer'>
            <GameBar games={games} onSelectGame={handleSelectGame} onAddGame={handleAddGame} />
            {showForm && !showUpdateForm && (
                <GameForm
                    onAdd={handleCreateGame}
                    onCancel={handleCancel}
                    isUpdate={false}
                />
            )}

            {showUpdateForm && (
                <GameForm
                    initialData={updateGameData}
                    onUpdate={handleUpdateGame}
                    onCancel={() => setShowUpdateForm(false)}
                    isUpdate={true}
                />
            )}
            {selectedGameId && (
                <div>
                    <button onClick={() => handleShowComponent('roster')}>Roster</button>
                    <button onClick={() => handleShowComponent('historic')}>Historique</button>
                    <button onClick={() => handleDeleteGame(selectedGameId)}>Supprimer l'équipe</button>
                    <button onClick={() => handleOpenUpdateForm(selectedGameId)}>Modifier le jeu</button>
                </div>
            )}

            {selectedComponent === 'roster' && <RosterComponent gameId={selectedGameId} />}
            {selectedComponent === 'historic' && <HistoricComponent gameId={selectedGameId} />}
        </div>
    );
};

export default EquipeComponent;
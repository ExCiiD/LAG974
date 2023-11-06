import { useEffect, useState } from 'react';
import axios from 'axios';

import RosterComponent from '../components/RosterComponent.js';
import HistoricComponent from '../components/HistoricComponent.js';

import '../styles/EquipeComponent.css';
import '../styles/List.css';

//images :
import createBtn from '../images/createBtn.png';

const token = localStorage.getItem('token');

///////////////////////////////////////////////////SOUS COMPOSANT GAMEBAR
const GameBar = ({ games, onSelectGame, onAddGame }) => {
    return (
        <div className='gameBar'>
            {games.map(game => (
                <img
                    key={game._id}
                    src={game.icone}
                    alt={game.nomJeu}
                    onClick={() => onSelectGame(game._id)}
                />
            ))}
            <button onClick={onAddGame}><img src={createBtn} alt='create Button' /></button>
        </div>
    );
};
///////////////////////////////////////////////////

///////////////////////////////////////////////////SOUS COMPOSANT FORMULAIRE POUR LA CREATION DE JEU
const GameForm = ({ onAdd, onCancel }) => {
    const [formData, setFormData] = useState({
        nomJeu: '',
        icone: '',
        thumbnail: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        setFormData({
            nomJeu: '',
            icone: '',
            thumbnail: ''
        });
    };

    return (
        <form className='backForm' onSubmit={handleSubmit}>
            <input
                className='backFormInput'
                value={formData.nomJeu}
                onChange={e => setFormData({ ...formData, nomJeu: e.target.value })}
                placeholder="Nom du jeu"
            />
            <input
                className='backFormInput'
                value={formData.icone}
                onChange={e => setFormData({ ...formData, icone: e.target.value })}
                placeholder="URL de l'icône"
            />
            <input
                className='backFormInput'
                value={formData.thumbnail}
                onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                placeholder="URL de la vignette"
            />
            <button className='backFormBtn' type="submit">Créer le jeu</button>
            <button className='backFormBtn' type="button" onClick={onCancel}>Annuler</button>
        </form>
    );
};
///////////////////////////////////////////////////


const EquipeComponent = () => {

    const [games, setGames] = useState([]);
    const [selectedGameId, setSelectedGameId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState(null);

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

    // Fonction pour afficher le composant Roster ou Historique
    const handleShowComponent = (componentName) => {
        setSelectedComponent(componentName);
    };

    return (
        <div className='equipeContainer'>
            <GameBar games={games} onSelectGame={handleSelectGame} onAddGame={handleAddGame} />
            {showForm && <GameForm onAdd={handleCreateGame} onCancel={handleCancel} />}
            {selectedGameId && (
                <div>
                    <button onClick={() => handleShowComponent('roster')}>Roster</button>
                    <button onClick={() => handleShowComponent('historic')}>Historique</button>
                </div>
            )}

            {selectedComponent === 'roster' && <RosterComponent gameId={selectedGameId} />}
            {selectedComponent === 'historic' && <HistoricComponent gameId={selectedGameId} />}
        </div>
    );
};

export default EquipeComponent;
import React from 'react'

import '../styles/Roster.css';

import PlayerCard from '../components/PlayerCard'
import EventHistoric from '../components/EventHistoric';

const Roster = () => {
    const team = {
        name: "Nom de l'équipe",
        players: [
            {
                lane: "TOP",
                photo: "photoJoueur.png",
                socialNetworks: [
                    { name: "Twitter", url: "https://twitter.com" },
                    { name: "Facebook", url: "https://Facebook.com" }
                ],
                name: "nom",
                pseudo: "PSEUDO",
                firstName: "prenom",
            },
            {
                lane: "TOP",
                photo: "photoJoueur.png",
                socialNetworks: [
                    { name: "Twitter", url: "https://twitter.com" },
                    { name: "Facebook", url: "https://Facebook.com" }
                ],
                name: "nom",
                pseudo: "PSEUDO",
                firstName: "prenom",
            },
            {
                lane: "TOP",
                photo: "photoJoueur.png",
                socialNetworks: [
                    { name: "Twitter", url: "https://twitter.com" },
                    { name: "Facebook", url: "https://Facebook.com" }
                ],
                name: "nom",
                pseudo: "PSEUDO",
                firstName: "prenom",
            },
            {
                lane: "TOP",
                photo: "photoJoueur.png",
                socialNetworks: [
                    { name: "Twitter", url: "https://twitter.com" },
                    { name: "Facebook", url: "https://Facebook.com" }
                ],
                name: "nom",
                pseudo: "PSEUDO",
                firstName: "prenom",
            },
            {
                lane: "TOP",
                photo: "photoJoueur.png",
                socialNetworks: [
                    { name: "Twitter", url: "https://twitter.com" },
                    { name: "Facebook", url: "https://Facebook.com" }
                ],
                name: "nom",
                pseudo: "PSEUDO",
                firstName: "prenom",
            },
            {
                lane: "TOP",
                photo: "photoJoueur.png",
                socialNetworks: [
                    { name: "Twitter", url: "https://twitter.com" },
                    { name: "Facebook", url: "https://Facebook.com" }
                ],
                name: "nom",
                pseudo: "PSEUDO",
                firstName: "prenom",
            }
        ],
        events: [
            {
                id: 1,
                name: "Nom de l'événement 1",
                ranking: 1,
                startDate: "01/10/2023",
                endDate: "05/10/2023"
            },
            {
                id: 2,
                name: "Nom de l'événement 1",
                ranking: 1,
                startDate: "01/10/2023",
                endDate: "05/10/2023"
            },
            {
                id: 3,
                name: "Nom de l'événement 1",
                ranking: 1,
                startDate: "01/10/2023",
                endDate: "05/10/2023"
            }
            // ... Autres événements
        ]
    };
    return (
        <div className='content roster'>
            <div className='pageTitleCorners'>
                <div className='pageTitle'>
                    <h1 className='pageTitleContent'>ROSTER NAME</h1>
                </div>
            </div>
            <div className='rosterContentContainer'>
                <div className='playerCardContainer'>
                    {team.players.map(player => (
                        <PlayerCard key={player.id} {...player} />
                    ))}
                </div>
                <div className='rosterHistoricContainer'>
                    < EventHistoric events={team.events} />
                </div>
            </div>
        </div>
    )
}

export default Roster
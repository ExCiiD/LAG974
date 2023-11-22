import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Apropos.css'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const Apropos = () => {
    //POUR AFFICHER LE BON ONGLET 
    const [showPresentation, setShowPresentation] = useState(true);
    const [showHistorique, setShowHistorique] = useState(false);
    //POUR CHANGER LE BG COLOR DE L'ONGLET QUAND ACTIF
    const [activeTab, setActiveTab] = useState('association');

    const handleOngletClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'association') {
            setShowPresentation(true);
            setShowHistorique(false);
        } else if (tab === 'historique') {
            setShowPresentation(false);
            setShowHistorique(true);
        }
    };
    //

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchJeuData = async () => {
            try {
                const response = await axios.get(`/lagapi/Evenements`);
                // Mettre à jour l'état avec les données de l'équipe
                setEvents(response.data.evenements);
                console.log('reponse :', response.data.evenements);
            } catch (error) {
                console.error("Erreur lors du chargement des données de l'équipe:", error);
            }
        };
        fetchJeuData();
    }, []);

    const formatDate = (dateString) => {
        // Séparation de la date en composants (année, mois, jour)
        const parts = dateString.split('-');
        if (parts.length !== 3) {
            console.error("Format de date incorrect:", dateString);
            return "Date inconnue";
        }

        // Inversion des composants pour obtenir le format jj/mm/aaaa
        return `${parts[2].substring(0, 2)}/${parts[1]}/${parts[0]}`;
    };

    return (
        <div className='content apropos'>
            <div className='pageTitleCorners'>
                <div className='pageTitle'>
                    <h1 className='pageTitleContent'>A PROPOS</h1>
                </div>
            </div>
            <div className='ongletContainer'>
                <div className={`onglet ${activeTab === 'association' ? 'active' : ''}`} onClick={() => handleOngletClick('association')}>
                    {/* applique la variable active tab pour changer de couleur */}
                    <h2>L'ASSOCIATION</h2>
                </div>
                <div className={`onglet clipped ${activeTab === 'historique' ? 'active' : ''}`} onClick={() => handleOngletClick('historique')}>
                    <h2>HISTORIQUE</h2>
                </div>
            </div>
            {/* affiche uniquement si show presentation = true ce qui est le cas de base sur l'onglet association */}
            {showPresentation && (
                <div className='blocPresentation'>
                    <div className='blocP'>
                        <div className='imgPresentation'></div>
                        <div className='paragraphePresentation'>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, </p>
                        </div>
                    </div>
                    <div className='blocPInverted'>
                        <div className='paragraphePresentation'>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.</p>
                        </div>
                        <div className='imgPresentation'></div>
                    </div>
                    <div className='blocP'>
                        <div className='imgPresentation'></div>
                        <div className='paragraphePresentation'>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.</p>
                        </div>
                    </div>
                    <div className='inscriptionTaff'>
                        <p>Vous voulez participer ?</p>
                        <Link className='normalButton' to="/contact?sujet=Devenir%20benevole">Rejoindre le staff</Link>
                    </div>
                </div>
            )}
            {/* affiche uniquement si show presentation = true (passe a true/false quand on clique) */}
            {showHistorique && (
                <div className='blocHistorique'>
                    <VerticalTimeline>
                        {Array.isArray(events) &&
                            events
                                /* classe par date du plus récent au plus vieux */
                                .sort(function compare(a, b) {
                                    var dateA = new Date(a.dateDebut);
                                    var dateB = new Date(b.dateDebut);
                                    return dateB - dateA;
                                })
                                .map(event => (
                                    <VerticalTimelineElement
                                        key={event._id}
                                        className="vertical-timeline-element--work"
                                        contentStyle={{ background: 'rgb(247, 180, 0)', color: '#000' }}
                                        contentArrowStyle={{ borderRight: '7px solid  rgb(247, 180, 0)' }}
                                        iconStyle={{ background: 'rgb(247, 180, 0)', color: '#fff' }}
                                        date={<p style={{ color: 'white' }}>
                                            {formatDate(event.dateDebut)}
                                            {event.dateFin ? (
                                                <>-{formatDate(event.dateFin)}</>
                                            ) : (
                                                <></>
                                            )}
                                        </p>}
                                        icon={<img className='historicIcon' src={event.thumbnailEvent} alt={` ${event.nomEvent}`} />}
                                    >
                                        <h3 className="vertical-timeline-element-title">{event.nomEvent}</h3>
                                        <p>
                                            {event.description}
                                        </p>
                                    </VerticalTimelineElement>
                                ))}
                    </VerticalTimeline>
                </div>
            )}
        </div>
    )
}

export default Apropos
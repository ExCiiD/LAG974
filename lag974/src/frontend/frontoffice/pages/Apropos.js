import React, { useState } from 'react';
import '../styles/Apropos.css'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Link } from 'react-router-dom';

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
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(247, 180, 0)', color: '#000' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(247, 180, 0)' }}
                            date="2011 - present"
                            iconStyle={{ background: 'rgb(247, 180, 0)', color: '#fff' }}
                        /* icon={} */
                        >
                            <h3 className="vertical-timeline-element-title">Title</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                            </p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(247, 180, 0)', color: '#000' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(247, 180, 0)' }}
                            date="2011 - present"
                            iconStyle={{ background: 'rgb(247, 180, 0)', color: '#fff' }}
                        /* icon={} */
                        >
                            <h3 className="vertical-timeline-element-title">Title</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                            </p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(247, 180, 0)', color: '#000' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(247, 180, 0)' }}
                            date="2011 - present"
                            iconStyle={{ background: 'rgb(247, 180, 0)', color: '#fff' }}
                        /* icon={} */
                        >
                            <h3 className="vertical-timeline-element-title">Title</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                            </p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(247, 180, 0)', color: '#000' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(247, 180, 0)' }}
                            date="2011 - present"
                            iconStyle={{ background: 'rgb(247, 180, 0)', color: '#fff' }}
                        /* icon={} */
                        >
                            <h3 className="vertical-timeline-element-title">Title</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                            </p>
                        </VerticalTimelineElement>

                    </VerticalTimeline>
                </div>
            )}
        </div>
    )
}

export default Apropos
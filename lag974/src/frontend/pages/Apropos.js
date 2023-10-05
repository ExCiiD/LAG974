import React from 'react'

import '../styles/Apropos.css'

const Apropos = () => {
    return (
        <div className='content apropos'>
            <div className='pageTitleCorners'>
                <div className='pageTitle'>
                    <h1>A PROPOS</h1>
                </div>
            </div>
            <div className='ongletContainer'>
                <div className='onglet'>
                    <h2>L'ASSOCIATION</h2>
                </div>
                <div className='onglet clipped'>
                    <h2>HISTORIQUE</h2>
                </div>
            </div>
            <div className='blocPresentation'>
                <div className='blocP'>
                    <div className='imgPresentation'></div>
                    <div className='paragraphePresentation'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, </p>
                    </div>
                </div>
                <div className='blocP'>
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
                    <a className='normalButton' href='#'>Rejoindre le staff</a>
                </div>
            </div>
            <div className='blocHistorique'>

            </div>
        </div>
    )
}

export default Apropos
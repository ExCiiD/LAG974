import React from 'react'

import '../styles/Evenements.css'

const Evenements = () => {
    return (
        <div className='content evenements'>
            {/* BLOC 1 */}
            <div className='blocNextEvent'>
                <div className='pageTitleCorners'>
                    <div className='pageTitle'>
                        <h1 className='pageTitleContent'>PROCHAIN EVENEMENT</h1>
                    </div>
                </div>
                <div className='shortDesc'>
                    <div className='sdImgContainer'>
                        <div className='imgTestBloc'></div>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, </p>
                </div>
                <div className='eventInfoContainer1'>
                    <div className='blocIc'>
                        <div className='pageTitleCornersMin'>
                            <div className='pageTitleMin'>
                                <h1 className='pageTitleContentMin'>Quand ?</h1>
                            </div>
                        </div>
                        <p> Du 29 Juillet 2023 au 30 Juilllet 2023 </p>
                    </div>
                    <div className='blocIc'>
                        <div className='pageTitleCornersMin'>
                            <div className='pageTitleMin'>
                                <h1 className='pageTitleContentMin'>Où ?</h1>
                            </div>
                        </div>
                        <p> Online </p>
                    </div>
                </div>
                <a href='#' className='normalButton'>S'INSCRIRE</a>
            </div>
            {/* BLOC 2 */}
            <div className='blocCurrentEvent'>
                <div className='pageTitleCorners'>
                    <div className='pageTitle'>
                        <h1 className='pageTitleContent'>EN COURS</h1>
                    </div>
                </div>
                <div className='shortDesc2'>
                    <div className='sdImgContainer'>
                        <div className='imgTestBloc'></div>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, </p>
                </div>
                <div className='currentEventBtnContainer'>
                    <a href='#' className='normalButton'>VOIR LE CLASSEMENT</a>
                    <a href='#' className='normalButton'>REGARDER</a>

                </div>
            </div>
            {/* BLOC 3 */}
            <div className='blocLastEvent'>a
                <div className='pageTitleCorners'>
                    <div className='pageTitle'>
                        <h1 className='pageTitleContent'>DERNIER EVENEMENT</h1>
                    </div>
                </div>
                <div className='shortDesc3'>
                    <div className='sdImgContainer'>
                        <div className='imgTestBloc'></div>
                    </div>
                    <div className='eventInfoContainer2'>
                        <div className='blocIc'>
                            <div className='pageTitleCornersMin'>
                                <div className='pageTitleMin'>
                                    <h1 className='pageTitleContentMin'>Quand ?</h1>
                                </div>
                            </div>
                            <p> Du 29 Juillet 2023 au 30 Juilllet 2023 </p>
                        </div>
                        <div className='blocIc'>
                            <div className='pageTitleCornersMin'>
                                <div className='pageTitleMin'>
                                    <h1 className='pageTitleContentMin'>Où ?</h1>
                                </div>
                            </div>
                            <p> Online</p>
                        </div>
                    </div>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, </p>
                <a href='#' className='normalButton'>VOIR LE RESULTAT</a>
            </div>
        </div>
    )
}

export default Evenements
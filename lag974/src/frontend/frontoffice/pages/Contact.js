import React from 'react'
import ContactForm from '../components/ContactForm.js'

const Contact = () => {
    return (
        <div className='content contact'>
            <div className='pageTitleCorners'>
                <div className='pageTitle'>
                    <h1 className='pageTitleContent'>CONTACT</h1>
                </div>
            </div>
            <ContactForm />
        </div>
    )
}

export default Contact

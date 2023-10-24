import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import '../styles/Formulaire.css';
function ContactForm() {
    const [subject, setSubject] = useState('');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const subjectFromURL = params.get('sujet');
        if (subjectFromURL) {
            setSubject(subjectFromURL);
        }
    }, [location]);

    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        sujet: subject,
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Données du formulaire soumis:", formData);
        //ajouter la logique pour envoyer les données du formulaire
    };

    return (
        <div className='formulaire'>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="nom" placeholder='NOM' value={formData.nom} onChange={handleChange} />
                </div>
                <div>
                    <input type="email" name="email" placeholder='EMAIL' value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <select name="sujet" value={subject} onChange={handleChange}>
                        <option value="Devenir bénévole">Devenir bénévole</option>
                        <option value="Rejoindre une équipe de jeu">Rejoindre une équipe de jeu</option>
                        <option value="Demande de partenariat">Demande de partenariat/sponsors</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
                <div>
                    <textarea className="messageArea" name="message" placeholder='MESSAGE..' value={formData.message} onChange={handleChange} />
                </div>
                <div className='formBtnContainer'>
                    <button className='normalButton' type="submit">Envoyer</button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
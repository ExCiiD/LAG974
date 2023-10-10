import React, { useState } from 'react';

import '../styles/Formulaire.css';
function ContactForm() {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        sujet: 'Devenir bénévole',
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
        // Ici, ajoutez la logique pour envoyer les données du formulaire à votre serveur ou service de messagerie
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
                    <select name="sujet" value={formData.sujet} onChange={handleChange}>
                        <option value="Devenir bénévole">Devenir bénévole</option>
                        <option value="Rejoindre une équipe de jeu">Rejoindre une équipe de jeu</option>
                        <option value="Demande de partenariat/sponsors">Demande de partenariat/sponsors</option>
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
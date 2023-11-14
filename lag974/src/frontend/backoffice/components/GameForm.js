import { useState, useEffect } from "react";

export const GameForm = ({ onAdd, onUpdate, onCancel, initialData = {}, isUpdate = false }) => {
    const [formData, setFormData] = useState({
        nomJeu: '',
        iconeJeu: '',
        thumbnailJeu: ''
    });

    useEffect(() => {
        if (isUpdate) {
            setFormData({
                nomJeu: initialData.nomJeu || '',
                iconeJeu: initialData.iconeJeu || '',
                thumbnailJeu: initialData.thumbnailJeu || ''
            });
        }
    }, [initialData, isUpdate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUpdate) {
            onUpdate(formData, initialData._id);
        } else {
            onAdd(formData);
        }
        setFormData({ nomJeu: '', iconeJeu: '', thumbnailJeu: '' });
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
                value={formData.iconeJeu}
                onChange={e => setFormData({ ...formData, iconeJeu: e.target.value })}
                placeholder="URL de l'icône"
            />
            <input
                className='backFormInput'
                value={formData.thumbnailJeu}
                onChange={e => setFormData({ ...formData, thumbnailJeu: e.target.value })}
                placeholder="URL de la vignette"
            />
            <button className='backFormBtn' type="submit">
                {isUpdate ? 'Mettre à jour le jeu' : 'Créer le jeu'}
            </button>
            <button className='backFormBtn' type="button" onClick={onCancel}>Annuler</button>
        </form>
    );
};
import { useState, useEffect } from "react";

export const GameForm = ({ onAdd, onUpdate, onCancel, initialData = {}, isUpdate = false }) => {
    const [formData, setFormData] = useState({
        nomJeu: '',
        iconeJeu: '',
        thumbnailJeu: '',
        acronyme: '',
    });
    const [iconePreview, setIconePreview] = useState('');
    const [thumbnailPreview, setThumbnailPreview] = useState('');

    useEffect(() => {
        if (isUpdate) {
            setFormData({
                nomJeu: initialData.nomJeu || '',
                acronyme: initialData.acronyme || '',
                iconeJeu: initialData.iconeJeu || '',
                thumbnailJeu: initialData.thumbnailJeu || ''
            });
            // Mettre à jour les prévisualisations
            setIconePreview(initialData.iconeJeu || '');
            setThumbnailPreview(initialData.thumbnailJeu || '');
        }
    }, [initialData, isUpdate]);

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, [type]: file });
            const previewUrl = URL.createObjectURL(file);
            if (type === 'iconeJeu') {
                setIconePreview(previewUrl);
            } else if (type === 'thumbnailJeu') {
                setThumbnailPreview(previewUrl);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUpdate) {
            onUpdate(formData, initialData._id);
        } else {
            onAdd(formData);
        }
        setFormData({ nomJeu: '', iconeJeu: '', thumbnailJeu: '' });
        setIconePreview('');
        setThumbnailPreview('');
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
                value={formData.acronyme}
                onChange={e => setFormData({ ...formData, acronyme: e.target.value })}
                placeholder="Acronyme"
            />
            {isUpdate && (
                <>
                    {iconePreview && <img className="previewImg" src={iconePreview} alt="Aperçu de l'icône" />}
                    <span>icone pour le backoffice</span>
                    <input
                        className='backFormInput'
                        type="file"
                        onChange={(e) => handleFileChange(e, 'iconeJeu')}
                        placeholder="Choisir une icône"
                    />
                    {thumbnailPreview && <img className="previewImg" src={thumbnailPreview} alt="Aperçu de la vignette" />}
                    <span>thumbnail pour le front office</span>
                    <input
                        className='backFormInput'
                        type="file"
                        onChange={(e) => handleFileChange(e, 'thumbnailJeu')}
                        placeholder="Choisir une vignette"
                    />
                </>
            )}
            <button className='backFormBtn' type="submit">
                {isUpdate ? 'Mettre à jour le jeu' : 'Créer le jeu'}
            </button>
            <button className='backFormBtn' type="button" onClick={onCancel}>Annuler</button>
        </form>
    );
};
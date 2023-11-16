import mongoose from 'mongoose';

const jeuSchema = new mongoose.Schema({
    nomJeu: {
        type: String,
        required: true,
    },
    acronyme: {
        type: String,
        required: true,
    },
    iconeJeu: {
        type: String,
    },
    thumbnailJeu: {
        type: String,
    },
});

// Création du modèle à partir du schéma
export const Jeu = mongoose.model('Jeu', jeuSchema);
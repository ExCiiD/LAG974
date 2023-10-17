import mongoose from 'mongoose';

const evenementSchema = new mongoose.Schema({
    nomEvent: {
        type: String,
        required: true,
        unique: true
    },
    dateDebut: {
        type: Date,
        required: true
    },
    dateFin: {
        type: Date,
        required: true
    },
    jeuEvenement: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
    },
    typeTournoi: {
        type: String,
        required: true,
        enum: ['online', 'lan'] // 'online' ou 'lan'
    },
    liens: {
        inscription: {
            type: String, // Devrait être une URL vers le formulaire Google
        },
        resultat: {
            type: String, // Devrait être une URL vers la page des résultats (ex. Toornament)
        },
        rediffusion: {
            type: String, // URL de la rediffusion
        }
    },
    recompense: {
        type: String
    },
    nombreParticipants: {
        type: Number
    }
});

// Création du modèle à partir du schéma
export const Evenement = mongoose.model('Evenement', evenementSchema);

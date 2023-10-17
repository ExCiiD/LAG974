import mongoose from "mongoose";
const { Schema, model } = mongoose;

const historiqueSchema = new mongoose.Schema({
    refEquipe: {
        type: Schema.Types.ObjectId,
        ref: 'Equipe',
        required: true,
    },
    evenements: [
        {
            nomEventHistoric: {
                type: String,
                required: true,
            },
            classement: {
                top: {
                    type: Number,
                    required: true,
                },
            },
            nombreEquipes: {
                type: Number,
                required: true,
            },
            dateDeDebut: {
                type: Date,
                required: true,
            },
            dateDeFin: {
                type: Date,
                required: true,
            },
        },
    ],
});

// Création du modèle à partir du schéma
export const Historique = mongoose.model('Historique', historiqueSchema);



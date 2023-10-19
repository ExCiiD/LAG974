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

//hook middleware qui se déclenchera avant les opérations `find` 
historiqueSchema.pre('find', function (next) {
    // 'this' est l'instance de la requête
    this.populate('refEquipe', 'jeu'); // spécifiez le champ à peupler
    next();
});

// Création du modèle à partir du schéma
export const Historique = mongoose.model('Historique', historiqueSchema);



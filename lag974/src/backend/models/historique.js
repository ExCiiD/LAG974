import mongoose from "mongoose";
const { Schema } = mongoose;

const historiqueSchema = new mongoose.Schema({
    refJeu: {
        type: Schema.Types.ObjectId,
        ref: 'Jeu',
        required: true,
    },
    evenements: [
        {
            nomEventHistoric: {
                type: String,
                required: true,
            },
            classement: {
                type: Number,
            },
            nombreEquipes: {
                type: Number,
            },
            dateDeDebut: {
                type: Date,
                required: true,
            },
            dateDeFin: {
                type: Date,
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



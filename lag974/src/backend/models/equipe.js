import mongoose from 'mongoose';
const { Schema, model } = mongoose; //bug terminal "schema.types.objectid non reconnu"

const equipeSchema = new mongoose.Schema({
    jeu: {
        type: Schema.Types.ObjectId,
        ref: 'Jeu',
        required: true,
    },
    roster: [{
        refJoueur: {
            type: Schema.Types.ObjectId,
            ref: 'Joueur',
        },
    }],
    historique: {
        type: Schema.Types.ObjectId,
        ref: 'Historique',
    }
});

//hook middleware qui se déclenchera avant les opérations `find` 
equipeSchema.pre('find', function (next) {
    // 'this' est l'instance de la requête
    this.populate('jeu', 'nomJeu'); // spécifiez le champ à peupler
    next();
});

export const Equipe = mongoose.model('Equipe', equipeSchema);
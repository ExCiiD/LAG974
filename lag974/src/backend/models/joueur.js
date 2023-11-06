import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const joueurSchema = new mongoose.Schema({
    nomJoueur: {
        type: String,
        required: true
    },
    prenomJoueur: {
        type: String,
        required: true
    },
    pseudoJoueur: {
        type: String,
        required: true
    },
    dateDeNaissanceJoueur: {
        type: Date,
        required: true
    },
    liensReseauxJoueur: {
        insta: {
            type: String,
            default: null
        },
        twitch: {
            type: String,
            default: null
        },
        youtube: {
            type: String,
            default: null
        },
        twitter: {
            type: String,
            default: null
        }
    },
    photoJoueur: {
        type: String,
        default: null
    },
    equipe: {
        type: Schema.Types.ObjectId,
        ref: 'Equipe',
        default: null,
    }
});

joueurSchema.pre('find', function (next) {
    // 'this' est l'instance de la requête
    this.populate({ path: 'equipe.jeu', select: 'nomJeu', }); // spécifiez le champ à peupler
    next();
});

// Création du modèle à partir du schéma
export const Joueur = mongoose.model('Joueur', joueurSchema);
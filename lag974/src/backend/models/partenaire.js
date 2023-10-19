import mongoose from 'mongoose';

const PartenaireSchema = new mongoose.Schema({
    nomPartenaire: {
        type: String,
        required: [true, 'Le nom du partenaire est obligatoire'],
    },
    logoPartenaire: {
        type: String,
        required: [true, 'Le logo est obligatoire'],
    },
    lienSitePartenaire: {
        type: String,
        validate: {
            validator: function (v) {
                // Validation simple de l'URL
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} n'est pas une URL valide!`
        },
    },
});

export const Partenaire = mongoose.model('Partenaire', PartenaireSchema);

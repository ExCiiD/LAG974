import mongoose from 'mongoose';
import crypto from 'crypto';
import nodemailer from 'nodemailer';


const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
    },
    // ... ajoutez d'autres champs si nécessaire
});

// Génération de mot de passe aléatoire
adminSchema.methods.generateRandomPassword = function () {
    // Générer un mot de passe sécurisé et aléatoire
    this.password = crypto.randomBytes(10).toString('hex');
};

// Méthode d'envoi de lien de connexion
adminSchema.methods.sendConnectionLink = async function () {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER, // Le nom d'utilisateur de l'expéditeur
            pass: process.env.GMAIL_PASS, // Le mot de passe de l'expéditeur
        },
    });

    // Génération du lien de connexion.
    let connectionLink = "http://lag974.re/login";

    // Configuration des options de l'e-mail
    let mailOptions = {
        from: '"lag974" <lag974@gmail.com>', // adresse de l'expéditeur
        to: this.email, // liste des destinataires
        subject: 'Lien de connexion pour lag974', // Sujet du courrier
        text: `Vous avez été inscrit en tant qu'administrateur du site lag974. Veuillez utiliser le lien suivant pour vous connecter: ${connectionLink}`, // corps du texte en texte brut
        html: `<p>Vous avez été inscrit en tant qu'administrateur du site lag974. Veuillez utiliser le lien suivant pour vous connecter: <a href="${connectionLink}">${connectionLink}</a></p>`, // corps du texte en HTML
    };

    // Envoi de l'e-mail
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message envoyé: %s', info.messageId);
    } catch (error) {
        console.error('Il y avait une erreur en envoyant l\'email: ', error);
    }
};

// middleware 'save' pour la génération de mot de passe
adminSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.generateRandomPassword();
    // Vous pouvez également ajouter ici l'envoi de courrier électronique, ou le gérer séparément lors de la création de l'administrateur
    next();
});

export const Admin = mongoose.model('Admin', adminSchema);


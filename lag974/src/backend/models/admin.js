import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });


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
    role: {  // s'assurer que le rôle est présent et défini correctement
        type: String,
        enum: ['staff', 'mainAdmin'],
        default: 'staff',
    },
});

// Génération de mot de passe aléatoire
adminSchema.methods.generateRandomPassword = async function () {
    // Générer un mot de passe sécurisé et aléatoire
    this.password = crypto.randomBytes(10).toString('hex');

    const salt = await bcrypt.genSalt(10); // Ceci génère le "sel" pour le hachage
    this.password = await bcrypt.hash(this.password, salt); // Hache le mot de passe avec le sel
};

// Méthode pour vérifier le mot de passe
adminSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

// Méthode d'envoi de lien de connexion
adminSchema.methods.sendConnectionLink = async function () {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME, // Le nom d'utilisateur de l'expéditeur
            pass: process.env.APPLICATION_SPECIFIC_PASSWORD, // Le mot de passe de l'expéditeur
        },
    });

    // Génération du lien de connexion.
    let connectionLink = "http://localhost:3000/backoffice/login";

    // Configuration des options de l'e-mail
    let mailOptions = {
        from: '"lag974" <staff.lag974@gmail.com>', // adresse de l'expéditeur
        to: this.email, // liste des destinataires
        subject: 'Lien de connexion pour lag974', // Sujet du courrier
        text: `Vous avez été inscrit en tant qu'administrateur du site lag974 avec les identifiants suivant : id : ${this.username} mdp : ${this.password}. Veuillez utiliser le lien suivant pour vous connecter: ${connectionLink}`, // corps du texte en texte brut
        html: `<p>Vous avez été inscrit en tant qu'administrateur du site lag974 avec les identifiants suivant </b> : id : ${this.username} </b> mdp : ${this.password}. </b> Veuillez utiliser le lien suivant pour vous connecter: <a href="${connectionLink}">${connectionLink}</a></p>`, // corps du texte en HTML
    };

    // Envoi de l'e-mail
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message envoyé: %s', info.messageId);
    } catch (error) {
        console.error('Il y a eu une erreur en envoyant l\'email: ', error);
    }
};

export const Admin = mongoose.model('Admin', adminSchema);


import { Admin } from "../models/admin.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export const adminController = {};

// Méthode pour gérer la connexion des administrateurs
adminController.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Trouver l'utilisateur par username
        const user = await Admin.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Authentification échouée. Utilisateur non trouvé." });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Authentification échouée. Mot de passe incorrect." });
        }

        // Utilisateur authentifié, maintenant nous créons le JWT
        const tokenPayload = {
            id: user._id, // l'identifiant de l'utilisateur
            username: user.username, // le nom d'utilisateur
            role: user.role, // le rôle de l'utilisateur (admin/staff)
        };

        // Signer le JWT avec le secret et inclure le rôle dans le payload
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' }); // expire dans 1 heure

        // Répondre avec le token
        res.json({
            message: "Connecté avec succès!",
            token: token,
        });
    } catch (error) {
        console.error("Erreur d'authentification: ", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }

};

//Fonction pour creer un nouvel admin
adminController.create = async (req, res) => {
    const { username, email } = req.body;

    try {
        const admin = new Admin({
            username,
            email,
        });

        await admin.generateRandomPassword();
        // Sauvegarde l'administrateur
        await admin.save();

        //envoie le mail 
        await admin.sendConnectionLink();

        res.status(201).json({
            message: 'Admin created successfully!',
            data: admin,
        });
    } catch (error) {
        // Gestion des erreurs
        console.error('Error creating admin: ', error);
        res.status(500).json({
            message: 'Error creating new admin.',
            error: error.message, // ou une représentation personnalisée de l'erreur
        });
    }
};

// Fonction pour récupérer la liste des admins
adminController.findAll = async (req, res) => {
    try {
        let admins = await Admin.find({});
        return res.status(200).send(admins);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour récupérer un admin spécifique par ID
adminController.findOne = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (admin) {
            return res.status(200).send(admin);
        } else {
            return res.status(404).send({ message: "Admin non trouvé" });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour mettre à jour un admin
adminController.update = async (req, res) => {
    try {
        let admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (admin) {
            return res.status(200).send(admin);
        } else {
            return res.status(404).send({ message: "Admin non trouvé" });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour supprimer un admin
adminController.delete = async (req, res) => {
    try {
        let admin = await Admin.findByIdAndDelete(req.params.id);
        if (admin) {
            return res.status(200).send({ message: "Admin supprimé avec succès" });
        } else {
            return res.status(404).send({ message: "Admin non trouvé" });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};
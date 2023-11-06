import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export const authRouter = express.Router();

import { Admin } from '../models/admin.js';

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;  // Changement de `email` à `username`

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe sont requis.' });
    }

    try {
        // Find admin by username
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }

        // Validate password using the `isValidPassword` method from the `Admin` model
        const isPasswordValid = await admin.isValidPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { adminId: admin._id, role: admin.role, username: admin.username, icon: admin.icon },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        // Respond with token
        return res.json({
            message: 'Connexion réussie! Vous êtes maintenant connecté.',
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});
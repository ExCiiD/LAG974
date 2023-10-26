import mongoose from 'mongoose';

import { Jeu } from "../models/jeu.js";
import { Equipe } from '../models/equipe.js';
import { Historique } from '../models/historique.js';

import multer from "multer";

/* // Configuration de multer pour spécifier où stocker les fichiers téléchargés
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Le dossier où stocker les fichiers
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renommez le fichier pour éviter les collisions
    },
});

const upload = multer({ storage });
 */

// Fonction pour créer un nouveau jeu
export const addJeu = async (req, res) => {
    let session = null;

    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const { nomJeu, iconeJeu, thumbnail } = req.body;

        const jeu = new Jeu({
            nomJeu,
            iconeJeu,
            thumbnail,
        });
        await jeu.save();

        // Créer une équipe avec la référence au jeu nouvellement créé
        const equipe = new Equipe({
            jeu: jeu._id, 
        });
        await equipe.save();

        // Créer un historique avec la référence a l'équipe nouvellement créé
        const historique = new Historique({
            refEquipe: equipe._id,
        });
        await historique.save();

        // Mettre à jour l'équipe avec la référence à l'historique
        equipe.historique = historique._id;
        await equipe.save();

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: 'jeu crée avec succès !', jeu, equipe });
    } catch (error) {
        console.error(error);

        if (session) {
            await session.abortTransaction();
            session.endSession();
        }

        res.status(500).json({ error: 'Une erreur est survenue lors de la création du jeu et de l\'équipe.' });
    }
};

// Fonction pour récupérer tous les jeux
export const getJeux = async (req, res) => {
    try {
        const jeux = await Jeu.find();
        res.status(200).json({ success: true, jeux });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des jeux.' });
    }
};

// Fonction pour récupérer un jeu par son ID
export const getJeuByID = async (req, res) => {
    const { id } = req.params;

    try {
        const jeu = await Jeu.findById(id);

        if (!jeu) {
            return res.status(404).json({ message: 'Jeu non trouvé.' });
        }

        res.status(200).json(jeu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du jeu.' });
    }
};

// Fonction pour mettre à jour un jeu par son ID
export const updateJeu = async (req, res) => {
    const { id } = req.params;
    const { nomJeu, iconeJeu, thumbnail } = req.body;

    try {
        const jeu = await Jeu.findByIdAndUpdate(id, {
            nomJeu,
            iconeJeu,
            thumbnail,
        }, { new: true });

        if (!jeu) {
            return res.status(404).json({ message: 'Jeu non trouvé.' });
        }

        res.status(200).json({ message: 'jeu mis a jour !', jeu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du jeu.' });
    }
};

// Fonction pour supprimer un jeu par son ID
export const deleteJeu = async (req, res) => {
    const { id } = req.params;

    try {
        const jeu = await Jeu.findByIdAndRemove(id);

        if (!jeu) {
            return res.status(404).json({ message: 'Jeu non trouvé.' });
        }

        res.status(204).json({ message: 'jeu supprimé !' }); // Réponse sans contenu pour indiquer la suppression réussie
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du jeu.' });
    }
};
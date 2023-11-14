import mongoose from 'mongoose';
import { Jeu } from "../models/jeu.js";
import { Equipe } from '../models/equipe.js';
import { Historique } from '../models/historique.js';

export const jeuController = {};

// Créer un nouveau jeu
jeuController.addJeu = async (req, res) => {
    try {
        let data = req.body;
        if (req.files) {
            const uploadPath = 'public/uploads'; // Chemin utilisé par express.static
            if (req.files.iconeJeu) {
                data.iconeJeu = req.files.iconeJeu[0].path.replace(new RegExp(`^${uploadPath}`), '');
            }
            if (req.files.thumbnailJeu) {
                data.thumbnailJeu = req.files.thumbnailJeu[0].path.replace(new RegExp(`^${uploadPath}`), '');
            }
        }

        const jeu = new Jeu(data);
        await jeu.save();

        // Créer une équipe avec la référence au jeu nouvellement créé
        const equipe = new Equipe({
            jeu: jeu._id,
        });
        await equipe.save();

        // Créer un historique avec la référence a l'équipe nouvellement créé
        const historique = new Historique({
            refJeu: jeu._id,
        });
        await historique.save();

        // Mettre à jour l'équipe avec la référence à l'historique
        equipe.historique = historique._id;
        await equipe.save();

        res.status(201).json({ success: true, message: 'Jeu créé avec succès !', jeu });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur lors de la création du jeu', error: error.message });
    }
};

// Récupérer tous les jeux
jeuController.getJeux = async (req, res) => {
    try {
        const jeux = await Jeu.find();
        res.status(200).json({ success: true, jeux });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des jeux.' });
    }
};

// Récupérer un jeu par son ID
jeuController.getJeuByID = async (req, res) => {
    try {
        const id = req.params;
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

// Mettre à jour un jeu par son ID
jeuController.updateJeu = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const updatedJeu = await Jeu.findByIdAndUpdate(id, data, { new: true });

        if (!updatedJeu) {
            return res.status(404).json({ message: 'Jeu non trouvé.' });
        }

        res.status(200).json({ message: 'jeu mis a jour !', updatedJeu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du jeu.' });
    }
};

// Supprimer un jeu par son ID
jeuController.deleteJeu = async (req, res) => {
    try {
        const id = req.params.id;
        const jeu = await Jeu.findByIdAndRemove(id);

        if (!jeu) {
            return res.status(404).json({ message: 'Jeu non trouvé.' });
        }

        // Suppression des équipes associées
        await Equipe.deleteMany({ jeu: id });

        // Suppression de l'historique associé
        await Historique.deleteMany({ refJeu: id });


        res.status(204).json({ message: 'jeu supprimé !' }); // Réponse sans contenu pour indiquer la suppression réussie
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du jeu.' });
    }
};

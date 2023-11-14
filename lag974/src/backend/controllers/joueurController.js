import { Joueur } from "../models/joueur.js";
import { Equipe } from "../models/equipe.js";

export const joueurController = {};

// Fonction pour créer un nouveau joueur
joueurController.create = async (req, res) => {
    try {
        let joueur = new Joueur(req.body);
        await joueur.save();
        return res.status(201).send(joueur);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour récupérer la liste des joueurs
joueurController.findAll = async (req, res) => {
    try {
        let joueurs = await Joueur.find({});
        return res.status(200).send({ success: true, joueurs });
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour récupérer un joueur par son ID
joueurController.findOne = async (req, res) => {
    try {
        let joueur = await Joueur.findById(req.params.id);
        if (!joueur) {
            return res.status(404).send('Joueur non trouvé.');
        }
        return res.status(200).send(joueur);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour mettre à jour un joueur
joueurController.update = async (req, res) => {
    try {
        let joueur = await Joueur.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!joueur) {
            return res.status(404).send('Joueur non trouvé.');
        }
        res.status(200).json({ message: 'Joueur mis a jour', joueur });
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour supprimer un joueur
joueurController.delete = async (req, res) => {
    try {
        // Trouver le joueur
        let joueur = await Joueur.findById(req.params.id);
        if (!joueur) {
            return res.status(404).send('Joueur non trouvé.');
        }

        // Trouver l'équipe à laquelle le joueur appartient
        let equipe = await Equipe.findOne({ roster: { $elemMatch: { refJoueur: req.params.id } } });
        if (equipe) {
            // Retirer le joueur du roster de l'équipe
            equipe.roster = equipe.roster.filter(j => j.refJoueur.toString() !== req.params.id);
            await equipe.save();
        }

        // Supprimer le joueur
        await Joueur.findByIdAndRemove(req.params.id);

        return res.status(200).send('Joueur supprimé.');
    } catch (error) {
        return res.status(500).send(error);
    }
};

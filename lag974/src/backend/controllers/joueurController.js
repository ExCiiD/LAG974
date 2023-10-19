import { Joueur } from "../models/joueur.js";

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
        return res.status(200).send(joueurs);
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
        return res.status(200).send('Joueur mis a jour.', joueur);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour supprimer un joueur
joueurController.delete = async (req, res) => {
    try {
        let joueur = await Joueur.findByIdAndRemove(req.params.id);
        if (!joueur) {
            return res.status(404).send('Joueur non trouvé.');
        }
        return res.status(200).send('Joueur supprimé.');
    } catch (error) {
        return res.status(500).send(error);
    }
};

import { Equipe } from "../models/equipe.js";
import { Joueur } from "../models/joueur.js";

export const equipeController = {};

// Fonction pour créer une nouvelle équipe
equipeController.create = async (req, res) => {
    try {
        let equipe = new Equipe(req.body);
        await equipe.save();
        return res.status(201).send(equipe);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour récupérer la liste des équipes
equipeController.findAll = async (req, res) => {
    try {
        let equipes = await Equipe.find({});
        return res.status(200).send(equipes);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour récupérer une équipe spécifique par ID
equipeController.findOne = async (req, res) => {
    try {
        let equipe = await Equipe.findById(req.params.id);
        if (equipe) {
            return res.status(200).send(equipe);
        } else {
            return res.status(404).send({ message: "Équipe non trouvée" });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour mettre à jour une équipe
equipeController.update = async (req, res) => {
    try {
        let equipe = await Equipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (equipe) {
            return res.status(200).send(equipe);
        } else {
            return res.status(404).send({ message: "Équipe non trouvée" });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour supprimer une équipe
equipeController.delete = async (req, res) => {
    try {
        let equipe = await Equipe.findByIdAndDelete(req.params.id);
        if (equipe) {
            return res.status(200).send({ message: "Équipe supprimée avec succès" });
        } else {
            return res.status(404).send({ message: "Équipe non trouvée" });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

//FONCTION SPECIALES :
/* //AJOUTER UN JOUER
equipeController.addJoueur = async (req, res) => {
    try {
        const equipe = await Equipe.findById(req.params.equipeId);

        if (!equipe) {
            return res.status(404).json({ message: 'Équipe non trouvée' });
        }

        // Ajouter le nouveau joueur
        equipe.roster.push({ refJoueur: req.body.refJoueur });
        await equipe.save();

        res.status(201).json({ message: 'Joueur ajouté avec succès.', equipe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} */
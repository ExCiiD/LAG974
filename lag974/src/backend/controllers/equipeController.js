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
        return res.status(200).send({ success: true, equipes });
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
//AJOUTER UN JOUER
equipeController.addJoueur = async (req, res) => {
    try {
        // Récupérer les IDs depuis la route
        const { idequipe, idjoueur } = req.params;

        //verifie si l'id equipe est bon (si l'equipe existe)
        const equipe = await Equipe.findById(req.params.idequipe);

        if (!equipe) {
            return res.status(404).json({ message: 'Équipe non trouvée' });
        }
        //verifie si l'id joueur est bon (si le joueur existe)
        const joueur = await Joueur.findById(req.params.idjoueur);

        if (!joueur) {
            return res.status(404).json({ message: 'joueur non trouvée' });
        }

        // Ajouter le nouveau joueur
        equipe.roster.push({ refJoueur: idjoueur });

        await equipe.save();

        res.status(201).json({ message: 'Joueur ajouté avec succès.', equipe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ENLEVER UN JOUEUR
equipeController.removeJoueur = async (req, res) => {
    try {
        // Récupérer les IDs depuis la route
        const { idequipe, idjoueur } = req.params;

        // Vérifie si l'id équipe est valide (si l'équipe existe)
        const equipe = await Equipe.findById(idequipe);

        if (!equipe) {
            return res.status(404).json({ message: 'Équipe non trouvée' });
        }

        // Vérifie si l'id joueur est valide (si le joueur existe)
        // même s'il n'est pas déjà dans l'équipe.
        const joueurExists = await Joueur.findById(idjoueur);

        if (!joueurExists) {
            return res.status(404).json({ message: 'Joueur non trouvé' });
        }

        // Trouver l'index du joueur dans le roster
        const index = equipe.roster.findIndex(item => item.refJoueur.equals(idjoueur));

        if (index === -1) {
            return res.status(404).json({ message: 'Joueur non trouvé dans l\'équipe' });
        }

        // Enlever le joueur
        equipe.roster.splice(index, 1);

        // Sauvegarder les changements dans l'équipe
        await equipe.save();

        res.status(200).json({ message: 'Joueur retiré avec succès.', equipe });
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: error.message });
    }
};
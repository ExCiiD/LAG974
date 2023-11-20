import { Evenement } from "../models/Evenement.js";

export const evenementController = {};

// Créer un nouvel événement
evenementController.createEvenement = async (req, res) => {
    try {
        const data = req.body;
        const newEvenement = await Evenement.create(data);

        res.status(201).json({ success: true, message: "Événement créé avec succès", evenement: newEvenement });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la création de l'événement", error: error.message });
    }
};

// Récupérer tous les événements
evenementController.getAllEvenements = async (req, res) => {
    try {
        const evenements = await Evenement.find({});
        res.status(200).json({ success: true, evenements });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des événements", error: error.message });
    }
};

// Récupérer un événement par ID
evenementController.getEvenementById = async (req, res) => {
    try {
        const id = req.params.id;
        const evenement = await Evenement.findById(id);

        if (!evenement) {
            return res.status(404).json({ success: false, message: "Événement non trouvé" });
        }

        res.status(200).json({ success: true, evenement });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération de l'événement", error: error.message });
    }
};

// Mettre à jour un événement
evenementController.updateEvenement = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const updatedEvenement = await Evenement.findByIdAndUpdate(id, data, { new: true });

        if (!updatedEvenement) {
            return res.status(404).json({ success: false, message: "Événement non trouvé" });
        }

        res.status(200).json({ success: true, message: "Événement mis à jour avec succès", evenement: updatedEvenement });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour de l'événement", error: error.message });
    }
};

// Supprimer un événement
evenementController.deleteEvenement = async (req, res) => {
    try {
        const id = req.params.id;
        const evenement = await Evenement.findByIdAndRemove(id);

        if (!evenement) {
            return res.status(404).json({ success: false, message: "Événement non trouvé" });
        }

        res.status(200).json({ success: true, message: "Événement supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la suppression de l'événement", error: error.message });
    }
};
import { Partenaire } from "../models/partenaire.js";

export const partenaireController = {};

// Fonction pour créer un nouveau partenaire
partenaireController.create = async (req, res) => {
    try {
        // Récupération des données du partenaire à partir du corps de la requête
        const { nomPartenaire, logoPartenaire, lienSitePartenaire } = req.body;

        // Création d'un nouveau document Partenaire
        const partenaire = new Partenaire({
            nomPartenaire,
            logoPartenaire,
            lienSitePartenaire,
        });

        await partenaire.save();

        res.status(201).json({
            success: true,
            message: "partenaire crée avec succées"
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({
                success: false,
                message: 'Validation échouée',
                errors: error.errors,
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'error du serveur: échec de la création du partenaire',
            });
        }
    }
};


// Fonction pour récupérer tous les partenaires
partenaireController.findAll = async (req, res) => {
    try {
        const partenaires = await Partenaire.find();
        res.status(200).json({
            success: true,
            partenaires,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error du serveur: échec de la récupération des partenaires',
        });
    }
};

// Fonction pour récupérer un partenaire par son ID
partenaireController.findOne = async (req, res) => {
    try {
        const partenaire = await Partenaire.findById(req.params.id);
        if (!partenaire) {
            return res.status(404).json({
                success: false,
                message: 'Partenaire non trouvé',
            });
        }
        res.status(200).json({
            success: true,
            data: partenaire,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error du serveur: échec de la récupération du partenaire',
        });
    }
};

// Fonction pour mettre à jour un partenaire par son ID
partenaireController.update = async (req, res) => {
    try {
        const partenaire = await Partenaire.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // pour retourner l'objet modifié
            runValidators: true, // pour exécuter les validateurs du schéma sur la mise à jour
        });
        if (!partenaire) {
            return res.status(404).json({
                success: false,
                message: 'Partenaire non trouvé',
            });
        }
        res.status(200).json({
            success: true,
            data: partenaire,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error du serveur: échec de la mise à jour du partenaire',
        });
    }
};

// Fonction pour supprimer un partenaire par son ID
partenaireController.delete = async (req, res) => {
    try {
        const partenaire = await Partenaire.findByIdAndRemove(req.params.id);
        if (!partenaire) {
            return res.status(404).json({
                success: false,
                message: 'Partenaire non trouvé',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Partenaire supprimé avec succès',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error du serveur: échec de la suppression du partenaire',
        });
    }
};
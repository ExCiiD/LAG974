import { Admin } from "../models/admin.js";

export const adminController = {};

//Fonction pour creer un nouvel admin
adminController.create = async (req, res) => {
    const { username, email } = req.body;

    try {
        const admin = new Admin({
            username,
            email,
            // Le mot de passe est généré lors de la sauvegarde grâce au middleware 'save' dans modèle
        });

        // Sauvegarde l'administrateur et déclenche le middleware 'save' pour générer le mot de passe
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
import { Historique } from "../models/historique.js";

import { Equipe } from "../models/equipe.js";

export const historiqueController = {};

// Fonction pour créer un nouvel historique
historiqueController.create = async (req, res) => {
    try {
        // Extraire refEquipe et autres informations nécessaires du corps de la requête
        const { refEquipe, ...historiqueData } = req.body;

        // Trouver l'équipe associée à partir de refEquipe
        const equipe = await Equipe.findById(refEquipe);

        // Si aucune équipe n'est trouvée, renvoyer une erreur
        if (!equipe) {
            return res.status(404).send({ message: "Équipe non trouvée" });
        }

        // Créer un nouvel objet historique avec les données de l'équipe
        let historique = new Historique((req.body)/* {
            ...historiqueData,  // données originales de l'historique
            nomEquipe: equipe.nom,  // ou tout champ pertinent de l'objet `equipe`
            // ... autres champs à compléter depuis `equipe`
        } */);

        // Sauvegarder le nouvel historique dans la base de données
        await historique.save();

        // Optionnellement, mettre à jour l'objet equipe avec la référence de cet historique
        equipe.historique.push(historique);
        await equipe.save();

        // Renvoie une réponse avec l'historique créé
        return res.status(201).send(historique);

    } catch (error) {
        // Gestion des erreurs
        return res.status(500).send(error);
    }
};

// Fonction pour récupérer la liste des historiques
historiqueController.findAll = async (req, res) => {
    try {
        let historiques = await Historique.find({});
        return res.status(200).send(historiques);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour récupérer un historique spécifique par ID
historiqueController.findOne = async (req, res) => {
    try {
        let historique = await Historique.findById(req.params.id);
        if (historique) {
            return res.status(200).send(historique);
        } else {
            return res.status(404).send({ message: "Historique non trouvé" });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour mettre à jour un historique
historiqueController.update = async (req, res) => {
    try {
        let historique = await Historique.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (historique) {
            return res.status(200).send(historique);
        } else {
            return res.status(404).send({ message: "Historique non trouvé" });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour supprimer un historique
historiqueController.delete = async (req, res) => {
    try {
        let historique = await Historique.findByIdAndDelete(req.params.id);
        if (historique) {
            return res.status(200).send({ message: "Historique supprimé avec succès" });
        } else {
            return res.status(404).send({ message: "Historique non trouvé" });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

//FONCTION SPECIALES :

historiqueController.addEvent = async (req, res) => {
    const { historiqueId } = req.params; // Récupération de l'ID de l'historique depuis les paramètres de la route
    const { nomEventHistoric, top, nombreEquipes, dateDeDebut, dateDeFin } = req.body; // Récupération des données de l'événement depuis le corps de la requête

    try {
        const historique = await Historique.findById(historiqueId);

        if (!historique) {
            return res.status(404).json({ message: "Historique non trouvé." });
        }

        // Création du nouvel événement
        const nouvelEvenement = {
            nomEventHistoric,
            classement: { top },
            nombreEquipes,
            dateDeDebut,
            dateDeFin
        };

        // Ajout de l'événement à l'historique
        historique.evenements.push(nouvelEvenement);

        await historique.save(); // Sauvegarde des changements dans la base de données

        res.status(201).json({ message: "Événement ajouté avec succès.", evenement: nouvelEvenement });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Fonction pour modifier un événement dans un historique
historiqueController.updateEvent = async (req, res) => {
    try {
        const { historiqueId, eventId } = req.params; // Identifiants passés dans l'URL
        const { nomEventHistoric, classement, nombreEquipes, dateDeDebut, dateDeFin } = req.body; // Nouvelles données

        // Recherche de l'historique spécifique
        const historique = await Historique.findById(historiqueId);
        if (!historique) {
            return res.status(404).send({ message: "Historique non trouvé" });
        }

        // Trouver l'événement dans l'historique et le mettre à jour
        const event = historique.evenements.id(eventId);
        if (!event) {
            return res.status(404).send({ message: "Événement non trouvé dans l'historique" });
        }

        // Mettre à jour les informations de l'événement
        event.nomEventHistoric = nomEventHistoric || event.nomEventHistoric;
        event.classement = classement || event.classement;
        event.nombreEquipes = nombreEquipes || event.nombreEquipes;
        event.dateDeDebut = dateDeDebut || event.dateDeDebut;
        event.dateDeFin = dateDeFin || event.dateDeFin;

        // Sauvegarder les modifications
        await historique.save();
        return res.status(200).send(event);

    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour supprimer un événement d'un historique
historiqueController.deleteEvent = async (req, res) => {
    try {
        const { historiqueId, eventId } = req.params; // Identifiants passés dans l'URL

        // Recherche de l'historique spécifique
        const historique = await Historique.findById(historiqueId);
        if (!historique) {
            return res.status(404).send({ message: "Historique non trouvé" });
        }

        // Supprimer l'événement de l'historique
        const event = historique.evenements.id(eventId);
        if (!event) {
            return res.status(404).send({ message: "Événement non trouvé dans l'historique" });
        }
        event.remove();

        // Sauvegarder les modifications
        await historique.save();
        return res.status(200).send({ message: "Événement supprimé" });

    } catch (error) {
        return res.status(500).send(error);
    }
};


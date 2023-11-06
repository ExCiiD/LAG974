import { Historique } from "../models/historique.js";

import { Equipe } from "../models/equipe.js";

export const historiqueController = {};

// Fonction pour récupérer la liste des historiques
historiqueController.findAll = async (req, res) => {
    try {
        let historiques = await Historique.find({});
        return res.status(200).send({ success: true, historiques });
    } catch (error) {
        return res.status(500).send(error);
    }
};

// Fonction pour obtenir un historique par refJeu (gameId)
historiqueController.getByGameId = async (req, res) => {
    try {
        const historique = await Historique.findOne({ refJeu: req.params.jeuid });
        if (!historique) {
            return res.status(404).json({ message: "Historique non trouvée avec cet ObjectId de jeu." });
        }
        res.status(200).json(historique);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'Historique.", error });
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
    const { nomEventHistoric, classement, nombreEquipes, dateDeDebut, dateDeFin } = req.body; // Récupération des données de l'événement depuis le corps de la requête

    try {
        const historique = await Historique.findById(historiqueId);

        if (!historique) {
            return res.status(404).json({ message: "Historique non trouvé." });
        }

        // Création du nouvel événement
        const nouvelEvenement = {
            nomEventHistoric,
            classement,
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


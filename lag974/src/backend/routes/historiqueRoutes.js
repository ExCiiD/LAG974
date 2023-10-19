import express from 'express';
import { historiqueController } from '../controllers/historiqueController.js';

export const historiqueRouter = express.Router();

// Route pour créer un nouvel historique
historiqueRouter.post('/historiques', historiqueController.create);

// Route pour récupérer tous les historiques
historiqueRouter.get('/historiques', historiqueController.findAll);

// Route pour récupérer un historique par son ID
historiqueRouter.get('/historiques/:id', historiqueController.findOne);

// Route pour mettre à jour un historique par son ID
historiqueRouter.put('/historiques/:id', historiqueController.update);

// Route pour supprimer un historique par son ID
historiqueRouter.delete('/historiques/:id', historiqueController.delete);

// Route pour ajouter un événement à un historique spécifique
historiqueRouter.post('/historiques/:historiqueId/event', historiqueController.addEvent);

// Route pour mettre à jour un événement spécifique dans un historique
historiqueRouter.put('/historiques/:historiqueId/event/:eventId', historiqueController.updateEvent);

// Route pour supprimer un événement spécifique dans un historique
historiqueRouter.delete('/historiques/:historiqueId/event/:eventId', historiqueController.deleteEvent);

import express from 'express';
import { historiqueController } from '../controllers/historiqueController.js';
import { requireRole } from '../middleware/permissionsCheck.js';

export const historiqueRouter = express.Router();

// Route pour récupérer tous les historiques
historiqueRouter.get('/historiques', historiqueController.findAll);

// Route pour récupérer un historique par son game ID
historiqueRouter.get('/historiques/:jeuid', historiqueController.getByGameId);

// Route pour supprimer un historique par son ID
historiqueRouter.delete('/historiques/:id', requireRole(['mainAdmin', 'staff']), historiqueController.delete);

// Route pour ajouter un événement à un historique spécifique
historiqueRouter.post('/historiques/:historiqueId/event', requireRole(['mainAdmin', 'staff']), historiqueController.addEvent);

// Route pour mettre à jour un événement spécifique dans un historique
historiqueRouter.put('/historiques/:historiqueId/event/:eventId', requireRole(['mainAdmin', 'staff']), historiqueController.updateEvent);

// Route pour supprimer un événement spécifique dans un historique
historiqueRouter.delete('/historiques/:historiqueId/event/:eventId', requireRole(['mainAdmin', 'staff']), historiqueController.deleteEvent);

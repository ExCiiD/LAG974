import express from 'express';
import { equipeController } from '../controllers/equipeController.js';
import { requireRole } from '../middleware/permissionsCheck.js';

export const equipeRouter = express.Router();

// Route pour créer une nouvelle équipe
equipeRouter.post('/equipes', requireRole(['mainAdmin', 'staff']), equipeController.create);

// Route pour récupérer toutes les équipes
equipeRouter.get('/equipes', equipeController.findAll);

// Route pour récupérer une équipe spécifique par son ID
equipeRouter.get('/equipes/id/:id', equipeController.findById);

// Route pour récupérer une équipe par son game ID
equipeRouter.get('/equipes/jeu/:jeuid', equipeController.findByJeuId);

// Route pour mettre à jour une équipe par son ID
equipeRouter.put('/equipes/:id', requireRole(['mainAdmin', 'staff']), equipeController.update);

// Route pour supprimer une équipe par son ID
equipeRouter.delete('/equipes/:id', requireRole(['mainAdmin', 'staff']), equipeController.delete);

// Route pour ajouter un joueur à l'équipe
equipeRouter.post('/equipes/:idequipe/roster/:idjoueur', requireRole(['mainAdmin', 'staff']), equipeController.addJoueur);

// Route pour retirer un joueur de l'équipe
equipeRouter.delete('/equipes/:idequipe/roster/:idjoueur', requireRole(['mainAdmin', 'staff']), equipeController.removeJoueur);
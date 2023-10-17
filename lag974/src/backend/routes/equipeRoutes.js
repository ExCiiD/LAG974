import express from 'express';
import { equipeController } from '../controllers/equipeController.js';

export const equipeRouter = express.Router();

// Route pour créer une nouvelle équipe
equipeRouter.post('/equipes', equipeController.create);

// Route pour récupérer toutes les équipes
equipeRouter.get('/equipes', equipeController.findAll);

// Route pour récupérer une équipe par son ID
equipeRouter.get('/equipes/:id', equipeController.findOne);

// Route pour mettre à jour une équipe par son ID
equipeRouter.put('/equipes/:id', equipeController.update);

// Route pour supprimer une équipe par son ID
equipeRouter.delete('/equipes/:id', equipeController.delete);

/* // Route pour ajouter un joueur à l'équipe
equipeRouter.post('/equipes/:id/roster', equipeController.addPlayer); */
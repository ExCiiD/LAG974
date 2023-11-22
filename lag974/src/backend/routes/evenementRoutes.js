import express from "express";
import { evenementController } from "../controllers/evenementController.js";
import { requireRole } from '../middleware/permissionsCheck.js';

export const evenementRouter = new express.Router();

// Route pour créer un nouvel événement
evenementRouter.post('/evenements', requireRole(['mainAdmin', 'staff']), evenementController.createEvenement);

// Route pour récupérer tous les événements
evenementRouter.get('/evenements', evenementController.getAllEvenements);

// Route pour récupérer un événement spécifique par id
evenementRouter.get('/evenements/:id', evenementController.getEvenementById);

// Route pour mettre à jour un événement spécifique par id
evenementRouter.put('/evenements/:id', requireRole(['mainAdmin', 'staff']), evenementController.updateEvenement);

// Route pour supprimer un événement spécifique par id
evenementRouter.delete('/evenements/:id', requireRole(['mainAdmin', 'staff']), evenementController.deleteEvenement);

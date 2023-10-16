import express from "express";
import { evenementController } from "../controllers/evenementController.js";

export const evenementRoute = new express.Router();

// Route pour créer un nouvel événement
evenementRoute.post('/evenements', evenementController.createEvenement);

// Route pour récupérer tous les événements
evenementRoute.get('/evenements', evenementController.getAllEvenements);

// Route pour récupérer un événement spécifique par id
evenementRoute.get('/evenements/:id', evenementController.getEvenementById);

// Route pour mettre à jour un événement spécifique par id
evenementRoute.put('/evenements/:id', evenementController.updateEvenement);

// Route pour supprimer un événement spécifique par id
evenementRoute.delete('/evenements/:id', evenementController.deleteEvenement);

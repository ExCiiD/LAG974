import express from 'express';
import { joueurController } from '../controllers/joueurController.js';

export const joueurRouter = express.Router();

// Créer un nouveau joueur
joueurRouter.post('/joueurs', joueurController.create);

// Récupérer tous les joueurs
joueurRouter.get('/joueurs', joueurController.findAll);

// Récupérer un seul joueur par ID
joueurRouter.get('/joueurs/:id', joueurController.findOne);

// Mettre à jour un joueur par ID
joueurRouter.put('/joueurs/:id', joueurController.update);

// Supprimer un joueur par ID
joueurRouter.delete('/joueurs/:id', joueurController.delete);
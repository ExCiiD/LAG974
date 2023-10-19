import express from 'express';
import { partenaireController } from '../controllers/partenaireController.js';

export const partenaireRouter = express.Router();

// Route pour créer un nouveau partenaire
partenaireRouter.post('/partenaires', partenaireController.create);

// Route pour récupérer tous les partenaires
partenaireRouter.get('/partenaires', partenaireController.findAll);

// Route pour récupérer un partenaire par son ID
partenaireRouter.get('/partenaires/:id', partenaireController.findOne);

// Route pour mettre à jour un partenaire par son ID
partenaireRouter.put('/partenaires/:id', partenaireController.update);

// Route pour supprimer un partenaire par son ID
partenaireRouter.delete('/partenaires/:id', partenaireController.delete);

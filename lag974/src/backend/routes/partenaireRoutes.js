import express from 'express';
import { partenaireController } from '../controllers/partenaireController.js';
import { requireRole } from '../middleware/permissionsCheck.js';

export const partenaireRouter = express.Router();

// Route pour créer un nouveau partenaire
partenaireRouter.post('/partenaires', requireRole(['mainAdmin', 'staff']), partenaireController.create);

// Route pour récupérer tous les partenaires
partenaireRouter.get('/partenaires', partenaireController.findAll);

// Route pour récupérer un partenaire par son ID
partenaireRouter.get('/partenaires/:id', partenaireController.findOne);

// Route pour mettre à jour un partenaire par son ID
partenaireRouter.put('/partenaires/:id', requireRole(['mainAdmin', 'staff']), partenaireController.update);

// Route pour supprimer un partenaire par son ID
partenaireRouter.delete('/partenaires/:id', requireRole(['mainAdmin', 'staff']), partenaireController.delete);

import express from 'express';
import { jeuController } from '../controllers/jeuController.js';
import { requireRole } from '../middleware/permissionsCheck.js';

export const jeuRouter = new express.Router();

//Route pour creer un nouveau jeu
jeuRouter.post('/jeux', requireRole(['mainAdmin', 'staff']), jeuController.addJeu);

//Route pour recuprer tous les jeux
jeuRouter.get('/jeux', jeuController.getJeux);

//Route pour recuprer un jeu par id
jeuRouter.get('/jeux/:id', jeuController.getJeuByID);

//Route pour mettre a jour un jeu par id
jeuRouter.put('/jeux/:id', requireRole(['mainAdmin', 'staff']), jeuController.updateJeu);

//Route pour supprimer un jeu par id
jeuRouter.delete('/jeux/:id', requireRole(['mainAdmin', 'staff']), jeuController.deleteJeu);
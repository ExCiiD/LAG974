import express from 'express';
import { addJeu, getJeux, getJeuByID, updateJeu, deleteJeu } from '../controllers/jeuController.js';

export const jeuRouter = new express.Router();

//Route pour creer un nouveau jeu
jeuRouter.post('/jeux', async (req, res) => {
    //appel du controller
    addJeu(req, res);
});

//Route pour recuprer tous les jeux
jeuRouter.get('/jeux', async (req, res) => {
    //appel du controller
    getJeux(req, res);
});

//Route pour recuprer un jeu par id
jeuRouter.get('/jeux/:id', async (req, res) => {
    //appel du controller
    getJeuByID(req, res);
});

//Route pour mettre a jour un jeu par id
jeuRouter.put('/jeux/:id', async (req, res) => {
    //appel du controller
    updateJeu(req, res);
});

//Route pour supprimer un jeu par id
jeuRouter.delete('/jeux/:id', async (req, res) => {
    //appel du controller
    deleteJeu(req, res);
});
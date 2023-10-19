import express from 'express';
import { adminController } from "../controllers/adminController.js";

export const adminRouter = express.Router();
//creer un nouvel admin
adminRouter.post('/admins', adminController.create);

//recuperer tous les admin
adminRouter.get('/admins', adminController.findAll);

//recuperer un admin avec l'id
adminRouter.get('/admins/:id', adminController.findOne);

//update un admin avec l'id
adminRouter.put('/admins/:id', adminController.update);

//delete un admin avec l'id
adminRouter.delete('/admins/:id', adminController.delete);

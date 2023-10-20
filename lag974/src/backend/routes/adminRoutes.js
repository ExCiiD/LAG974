import express from 'express';
import { adminController } from "../controllers/adminController.js";
import { requireRole } from '../middleware/permissionsCheck.js';
export const adminRouter = express.Router();
//creer un nouvel admin
adminRouter.post('/admins', requireRole('mainAdmin'), adminController.create);

//recuperer tous les admin
adminRouter.get('/admins', requireRole('mainAdmin'), adminController.findAll);

//recuperer un admin avec l'id
adminRouter.get('/admins/:id', requireRole('mainAdmin'), adminController.findOne);

//update un admin avec l'id
adminRouter.put('/admins/:id', requireRole('mainAdmin'), adminController.update);

//delete un admin avec l'id
adminRouter.delete('/admins/:id', requireRole('mainAdmin'), adminController.delete);

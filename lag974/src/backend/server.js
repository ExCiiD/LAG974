import express from 'express';
import dotenv from 'dotenv';

//routers
import { evenementRouter } from './routes/evenementRoutes.js';
import { joueurRouter } from './routes/joueurRoutes.js';
import { jeuRouter } from './routes/jeuRoutes.js';
import { historiqueRouter } from './routes/historiqueRoutes.js';
import { equipeRouter } from './routes/equipeRoutes.js';
import { partenaireRouter } from './routes/partenaireRoutes.js';
import { adminRouter } from './routes/adminRoutes.js';
import { authRouter } from './routes/connectionRoute.js';
import uploadRoutes from './routes/uploadRoutes.js';

//connection a la base de donnés
import { connectDB } from './db/mongodb.js';

dotenv.config();
connectDB(); 

const app = express();

app.use(express.json());

//backend et front pas sur le meme port
import cors from 'cors';
app.use(cors());

//api connection
app.use('/auth', authRouter);
//api images uploads
app.use('/upload', uploadRoutes);

app.use('/uploads', express.static('uploads'));
//api routes
app.use('/lagapi', jeuRouter, evenementRouter, joueurRouter, equipeRouter, historiqueRouter, partenaireRouter, adminRouter);

app.get('/lagapi', (req, res) => {
    res.send("API lag974")
});


const port = 7000;
app.listen(port, () => {
    console.log(`Le serveur a démarré au port ${port}`);
});
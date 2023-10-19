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

//connection a la base de donnés
import { connectDB } from './db/mongodb.js';
dotenv.config();
connectDB(); 

const port = 7000;
const app = express();

app.use(express.json());
app.use(jeuRouter, evenementRouter, joueurRouter, equipeRouter, historiqueRouter, partenaireRouter, adminRouter);
app.get('/', (req, res) => { res.send("API lag974") });

app.listen(port, () =>
    console.log(`Le serveur a démarré au port ${port}`)
);
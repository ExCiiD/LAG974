import express from 'express';
import dotenv from 'dotenv';
//routes
import { jeuRoute } from './routes/jeuRoutes.js';
import { evenementRoute } from './routes/evenementRoutes.js'; 

//connection a la base de donnés
import { connectDB } from './db/mongodb.js';
dotenv.config();
connectDB(); 

const port = 7000;
const app = express();

app.use(express.json());
app.use(jeuRoute, evenementRoute);
app.get('/', (req, res) => { res.send("API lag974") });


app.listen(port, () =>
    console.log(`Le serveur a démarré au port ${port}`)
);
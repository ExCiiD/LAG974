import express from 'express';
import dotenv from 'dotenv';
//routes
/* import {  } from './routes/..Router.js'; */

//connection a la base de donnés
/* import { connectDB } from './config/mongodb.js';
dotenv.config();
connectDB(); */

const port = 7000;
const app = express();

/* app.use(express.json()); */
app.get('/', (req, res) => { res.send("API lag974") });


app.listen(port, () =>
    console.log(`Le serveur a démarré au port ${port}`)
);
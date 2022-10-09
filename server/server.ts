import 'dotenv/config';
import express, { Application, json, urlencoded } from 'express';
import cors from 'cors';
import pokedexRoutes from './routes/pokedexRoutes.js';
import connectDB from './config/db.js';

const port: number = process.env.PORT || 5000;
const app: Application = express();

connectDB();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN_URL }));
app.use('/api/pokedex', pokedexRoutes);

app.listen(port, (): void => console.log(`Server started on port ${port}`));

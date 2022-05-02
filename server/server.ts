import express, { Application } from 'express';
import { DotenvConfigOptions } from 'dotenv';
import pokedexRoutes from './routes/pokedexRoutes.js';

const port = process.env.PORT || 5000;
const app: Application = express();

app.use('/api/pokedex', pokedexRoutes);

app.listen(port, (): void => console.log(`Server started on port ${port}`));

import express, { Application, json, urlencoded } from 'express';
import 'dotenv/config';
import pokedexRoutes from './routes/pokedexRoutes.js';

const port = process.env.PORT || 5000;
const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/pokedex', pokedexRoutes);

app.listen(port, (): void => console.log(`Server started on port ${port}`));

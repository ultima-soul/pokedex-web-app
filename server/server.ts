import 'dotenv/config';
import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';
import cors from 'cors';
import pokedexRoutes from './routes/pokedexRoutes.js';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const port: number = process.env.PORT || 5000;
const app: Application = express();

connectDB();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN_URL }));
app.use('/api/pokedex', pokedexRoutes);

if (process.env.NODE_ENV === 'production') {
  const __filename: string = fileURLToPath(import.meta.url);
  const __dirname: string = path.dirname(__filename);

  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req: Request, res: Response) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  );
}

app.listen(port, (): void => console.log(`Server started on port ${port}`));

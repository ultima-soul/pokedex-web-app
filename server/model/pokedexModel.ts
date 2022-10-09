import { model, Schema } from 'mongoose';

interface IPokedex {
  _id: string;
  caughtMons: number[];
}

const pokedexSchema = new Schema<IPokedex>({
  _id: { type: String, required: true },
  caughtMons: { type: [Number], required: true },
});

export default model<IPokedex>('Pokedex', pokedexSchema, 'Pokedexes');

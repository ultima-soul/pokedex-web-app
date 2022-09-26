import { model, Schema } from 'mongoose';

interface IPokedex {
  caughtPokes: number[];
}

const pokedexSchema = new Schema<IPokedex>({
  caughtPokes: { type: [Number], required: true },
});

export default model<IPokedex>('Pokedex', pokedexSchema, 'Pokedexes');

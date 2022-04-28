export interface Pokedex {
  entries: PokedexEntry[];
}

export interface PokedexEntry {
  dexNum: number;
  name: string;
  image: string;
}

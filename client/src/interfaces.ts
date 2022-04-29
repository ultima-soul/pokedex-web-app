export interface Pokedex {
  entries: PokedexEntry[];
}

export interface PokedexEntry {
  dexNum: number;
  name: string;
  image: string;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

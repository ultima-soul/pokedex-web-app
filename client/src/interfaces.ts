export interface Pokedex {
  entries: PokedexEntry[];
}

export interface PokedexEntry {
  dexNum: number;
  name: string;
  image: string;
  caught: boolean;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokeAPIDexEntry {
  entry_number: number;
  pokemon_species: NamedAPIResource;
}

export interface PokemonGeneral {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  species: NamedAPIResource;
}

export interface PokemonSpecies {
  names: Name[];
}

export interface Name {
  name: string;
}

import { useEffect, useState } from 'react';
import DexEntries from './components/DexEntries';
import {
  NamedAPIResource,
  Pokedex,
  PokedexEntry,
  PokemonGeneral,
  PokemonSpecies,
} from './interfaces';

const App = () => {
  const [pokedex, setPokedex] = useState<Pokedex>({ entries: [] });

  const getMonBase64Image = (monData: PokemonGeneral) => {
    return new Promise<string>(async (resolve, reject) => {
      const imgUrl: string =
        monData.sprites.other['official-artwork'].front_default;
      const imgData = await (await fetch(imgUrl)).blob();
      const reader = new FileReader();
      reader.readAsDataURL(imgData);
      reader.onload = () => resolve(reader.result?.toString() || '');
      reader.onerror = (error) => reject(error);
    });
  };

  const getMonName = async (monData: PokemonGeneral) => {
    const res = await fetch(monData.species.url);
    const speciesData: PokemonSpecies = await res.json();
    return speciesData.names[8].name;
  };

  useEffect(() => {
    const fetchDexEntries = async () => {
      const res = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
      );
      const data = await res.json();

      const dexEntries: PokedexEntry[] = await Promise.all(
        data.results.map(async ({ url }: NamedAPIResource) => {
          const monRes = await fetch(url);
          const monData: PokemonGeneral = await monRes.json();

          const entry: PokedexEntry = {
            dexNum: monData.id,
            name: await getMonName(monData),
            image: await getMonBase64Image(monData),
          };

          return entry;
        })
      );

      setPokedex({ entries: dexEntries });
    };

    fetchDexEntries();
  }, []);

  return (
    <div className="App">
      <DexEntries pokedex={pokedex} />
    </div>
  );
};

export default App;

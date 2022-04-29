import { useEffect, useState } from 'react';
import DexEntries from './components/DexEntries';
import { NamedAPIResource, Pokedex, PokedexEntry, Pokemon } from './interfaces';

const App = () => {
  const [pokedex, setPokedex] = useState<Pokedex>({ entries: [] });

  const getMonBase64Image = (monData: Pokemon) => {
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

  useEffect(() => {
    const fetchDexEntries = async () => {
      const res = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
      );
      const data = await res.json();

      const dexEntries: PokedexEntry[] = await Promise.all(
        data.results.map(async ({ url }: NamedAPIResource) => {
          const monRes = await fetch(url);
          const monData: Pokemon = await monRes.json();

          const entry: PokedexEntry = {
            dexNum: monData.id,
            name: monData.name,
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

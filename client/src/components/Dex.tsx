import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import DexEntries from '../components/DexEntries';
import {
  NamedAPIResource,
  PokeAPIDexEntry,
  Pokedex,
  PokedexEntry,
  PokemonGeneral,
  PokemonSpecies,
} from '../interfaces';

interface Props {
  region: string;
}

const Dex = ({ region }: Props) => {
  const [pokedex, setPokedex] = useState<Pokedex>({ entries: [] });
  const serverUrl: string = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();

  const getCaughtMons = async (
    serverUrl: string,
    token: string
  ): Promise<number[]> => {
    const res = await fetch(`${serverUrl}/api/pokedex/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    return data.caughtMons;
  };

  const toggleCaught = async (dexNum: number) => {
    const token: string = await getAccessTokenSilently();
    const caughtMons: number[] = await getCaughtMons(serverUrl, token);
    let updatedCaughtMons: number[];

    if (caughtMons.includes(dexNum)) {
      updatedCaughtMons = caughtMons.filter(
        (monNum: number) => monNum !== dexNum
      );
    } else {
      updatedCaughtMons = [...caughtMons, dexNum];
    }

    const res = await fetch(`${serverUrl}/api/pokedex/`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ caughtMons: updatedCaughtMons }),
    });
    const data = await res.json();
    const resCaughtMons: number[] = data.caughtMons;

    const updatedEntries: PokedexEntry[] = pokedex.entries.map(
      (entry: PokedexEntry) =>
        entry.dexNum === dexNum
          ? { ...entry, caught: resCaughtMons.includes(entry.dexNum) }
          : entry
    );

    setPokedex({ entries: updatedEntries });
  };

  useEffect(() => {
    const getPokeAPIRes = async (): Promise<NamedAPIResource[]> => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokedex/${region}`);
      const data = await res.json();

      const pokeAPIRes: NamedAPIResource[] = data.pokemon_entries
        .slice(0, 493)
        .map((entry: PokeAPIDexEntry) => ({
          ...entry.pokemon_species,
          url: entry.pokemon_species.url.replace('-species', ''),
        }));

      return pokeAPIRes;
    };

    const getDexEntry = async ({
      url,
    }: NamedAPIResource): Promise<PokedexEntry> => {
      const monRes = await fetch(url);
      const monData: PokemonGeneral = await monRes.json();

      const entry: PokedexEntry = {
        dexNum: monData.id,
        name: await getMonName(monData),
        image: await getMonBase64Image(monData),
        caught: false,
      };

      return entry;
    };

    const getMonBase64Image = (monData: PokemonGeneral): Promise<string> => {
      return new Promise<string>(async (resolve, reject) => {
        const imgUrl: string =
          monData.sprites.other['official-artwork'].front_default;
        const imgData: Blob = await (await fetch(imgUrl)).blob();
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(imgData);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = (error) => reject(error);
      });
    };

    const getMonName = async (monData: PokemonGeneral): Promise<string> => {
      const res = await fetch(monData.species.url);
      const speciesData: PokemonSpecies = await res.json();
      return speciesData.names[8].name;
    };

    const fetchDexEntries = async () => {
      const pokeAPIRes: NamedAPIResource[] = await getPokeAPIRes();

      const dexEntries: PokedexEntry[] = await Promise.all(
        pokeAPIRes.map(getDexEntry)
      );

      const token: string = await getAccessTokenSilently();
      const caughtMons: number[] = await getCaughtMons(serverUrl, token);

      const updatedEntries: PokedexEntry[] = dexEntries.map(
        (entry: PokedexEntry) =>
          caughtMons.includes(entry.dexNum) ? { ...entry, caught: true } : entry
      );

      setPokedex({ entries: updatedEntries });
    };

    fetchDexEntries();
  }, [getAccessTokenSilently, serverUrl, region]);

  return <DexEntries pokedex={pokedex} onToggle={toggleCaught} />;
};

export default Dex;

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import DexEntries from '../components/DexEntries';
import {
  NamedAPIResource,
  Pokedex,
  PokedexEntry,
  PokemonGeneral,
  PokemonSpecies,
} from '../interfaces';

const Dashboard = () => {
  const [pokedex, setPokedex] = useState<Pokedex>({ entries: [] });
  const serverUrl: string = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();

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

  const getCacheExpiry = (): string => {
    const curr: Date = new Date();

    const expiry = curr.setMonth(curr.getMonth() + 1);

    return expiry.toString();
  };

  const getCaughtMons = async (): Promise<number[]> => {
    const token: string = await getAccessTokenSilently();

    const res = await fetch(`${serverUrl}/api/pokedex/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    return data.caughtMons;
  };

  useEffect(() => {
    const fetchDexEntries = async () => {
      const pokeApiRes: NamedAPIResource[] = await (async () => {
        if (localStorage.pokeApiRes) {
          const expiry = parseInt(localStorage.getItem('expiry') || '');

          if (Date.now() >= expiry) {
            localStorage.removeItem('pokeApiRes');
            localStorage.removeItem('expiry');
          } else {
            return JSON.parse(localStorage.getItem('pokeApiRes') || '');
          }
        }

        const res = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
        );
        const data = await res.json();

        const pokeApiRes: NamedAPIResource[] = data.results;
        localStorage.setItem('pokeApiRes', JSON.stringify(pokeApiRes));

        const expiry: string = getCacheExpiry();
        localStorage.setItem('expiry', expiry);

        return pokeApiRes;
      })();

      const dexEntries: PokedexEntry[] = await Promise.all(
        pokeApiRes.map(
          async ({ url }: NamedAPIResource): Promise<PokedexEntry> => {
            const monRes = await fetch(url);
            const monData: PokemonGeneral = await monRes.json();

            const entry: PokedexEntry = {
              dexNum: monData.id,
              name: await getMonName(monData),
              image: await getMonBase64Image(monData),
              caught: false,
            };

            return entry;
          }
        )
      );

      const caughtMons: number[] = await getCaughtMons();

      dexEntries.forEach((entry: PokedexEntry) => {
        if (caughtMons.includes(entry.dexNum)) {
          entry.caught = true;
        }
      });

      setPokedex({ entries: dexEntries });
    };

    fetchDexEntries();
  }, []);

  return (
    <Container>
      <DexEntries pokedex={pokedex} />
    </Container>
  );
};

export default Dashboard;

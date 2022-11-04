import { CSSProperties, useEffect, useState } from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  NamedAPIResource,
  PokeAPIDexEntry,
  PokemonGeneral,
} from '../interfaces';

interface Props {
  dexName: string;
  region: string;
  caughtMons: number[];
  path: string;
}

const cardStyle: CSSProperties = {
  textDecoration: 'inherit',
  color: 'inherit',
};

const DexProgressCard = ({ dexName, region, caughtMons, path }: Props) => {
  const [progress, setProgress] = useState<number>(0);

  const getMonDexNum = async ({ url }: NamedAPIResource) => {
    const monRes = await fetch(url);
    const monData: PokemonGeneral = await monRes.json();

    return monData.id;
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

    const getProgress = async () => {
      const pokeAPIRes: NamedAPIResource[] = await getPokeAPIRes();

      let monDexNums: number[] = [];

      for (
        let i: number = 0, size: number = Math.ceil(pokeAPIRes.length / 6);
        i < size;
        i++
      ) {
        const batchedRes: NamedAPIResource[] = pokeAPIRes.slice(
          i * 6,
          i * 6 + 6
        );
        const batchedDexNums = await Promise.all(batchedRes.map(getMonDexNum));
        monDexNums.push(...batchedDexNums);
      }

      const caughtMonDexNums: number[] = monDexNums.filter((dexNum: number) =>
        caughtMons.includes(dexNum)
      );

      const progress: number = Math.trunc(
        (caughtMonDexNums.length / monDexNums.length) * 100
      );

      setProgress(progress);
    };

    getProgress();
  }, [region, caughtMons]);

  return (
    <Card as={Link} to={path} style={cardStyle}>
      <Card.Body>
        <Card.Title>
          {dexName}
          {progress === 100 && (
            // ' '
            // +
            <i
              className="bi bi-trophy-fill ms-2"
              style={{ color: 'var(--bs-red)' }}
            ></i>
          )}
        </Card.Title>
        <ProgressBar>
          <ProgressBar
            now={progress}
            label={`${progress}%`}
            style={{ minWidth: '20px' }}
          />
        </ProgressBar>
      </Card.Body>
    </Card>
  );
};

export default DexProgressCard;

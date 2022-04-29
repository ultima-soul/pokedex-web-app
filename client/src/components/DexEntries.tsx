import { Pokedex, PokedexEntry } from '../interfaces';
import DexEntry from './DexEntry';

interface Props {
  pokedex: Pokedex;
}

const DexEntries = ({ pokedex }: Props) => {
  const { entries }: { entries: PokedexEntry[] } = pokedex;

  return (
    <>
      {entries.map((entry: PokedexEntry) => {
        return <DexEntry key={entry.dexNum} entry={entry} />;
      })}
    </>
  );
};

export default DexEntries;

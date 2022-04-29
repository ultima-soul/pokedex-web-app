import { PokedexEntry } from '../interfaces';

interface Props {
  entry: PokedexEntry;
}

const DexEntry = ({ entry }: Props) => {
  return (
    <>
      <img src={entry.image} />
      <div>{entry.dexNum}</div>
      <div>{entry.name}</div>
    </>
  );
};

export default DexEntry;

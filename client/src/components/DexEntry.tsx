import { PokedexEntry } from "../interfaces";

interface Props {
  entry: PokedexEntry;
}

const DexEntry = ({ entry }: Props) => {
  return <div key={entry.dexNum}>{entry.dexNum}</div>;
};

export default DexEntry;

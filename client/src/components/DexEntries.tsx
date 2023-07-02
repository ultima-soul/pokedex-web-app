import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import { Pokedex, PokedexEntry } from '../interfaces';
import DexEntry from './DexEntry';

interface Props {
  pokedex: Pokedex;
  showNationalNum: boolean;
  onToggle: (dexNum: number) => Promise<void>;
}

const DexEntries = ({ pokedex, showNationalNum, onToggle }: Props) => {
  const { entries }: { entries: PokedexEntry[] } = pokedex;

  return (
    <CardGroup>
      <Row xs={2} md={4} xl={6} className="g-4">
        {entries.map((entry: PokedexEntry, index: number) => {
          return (
            <DexEntry
              key={entry.dexNum}
              entry={entry}
              {...(!showNationalNum && { regionalNum: index + 1 })}
              onToggle={onToggle}
            />
          );
        })}
      </Row>
    </CardGroup>
  );
};

export default DexEntries;

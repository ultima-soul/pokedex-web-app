import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import { Pokedex, PokedexEntry } from '../interfaces';
import DexEntry from './DexEntry';

interface Props {
  pokedex: Pokedex;
  onToggle: (dexNum: number) => Promise<void>;
}

const DexEntries = ({ pokedex, onToggle }: Props) => {
  const { entries }: { entries: PokedexEntry[] } = pokedex;

  return (
    <section className="py-4">
      <Container>
        <CardGroup>
          <Row xs={2} md={4} xl={6} className="g-4">
            {entries.map((entry: PokedexEntry) => {
              return (
                <DexEntry
                  key={entry.dexNum}
                  entry={entry}
                  onToggle={onToggle}
                />
              );
            })}
          </Row>
        </CardGroup>
      </Container>
    </section>
  );
};

export default DexEntries;

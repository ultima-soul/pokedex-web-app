import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import { Pokedex, PokedexEntry } from '../interfaces';
import DexEntry from './DexEntry';

interface Props {
  pokedex: Pokedex;
}

const DexEntries = ({ pokedex }: Props) => {
  const { entries }: { entries: PokedexEntry[] } = pokedex;

  return (
    <section className="py-4">
      <Container>
        <CardGroup>
          <Row xs={1} sm={2} md={4} className="g-4">
            {entries.map((entry: PokedexEntry) => {
              return <DexEntry key={entry.dexNum} entry={entry} />;
            })}
          </Row>
        </CardGroup>
      </Container>
    </section>
  );
};

export default DexEntries;

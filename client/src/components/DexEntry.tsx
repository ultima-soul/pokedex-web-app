import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { PokedexEntry } from '../interfaces';

interface Props {
  entry: PokedexEntry;
}

const DexEntry = ({ entry }: Props) => {
  return (
    <Col>
      <Card>
        <Card.Header className="d-flex ps-2">
          <h6 className="pe-1">#{entry.dexNum.toString().padStart(3, '0')}</h6>
          <h6 className="ps-4">{entry.name}</h6>
        </Card.Header>
        <Card.Img src={entry.image} />
      </Card>
    </Col>
  );
};

export default DexEntry;

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { PokedexEntry } from '../interfaces';

interface Props {
  entry: PokedexEntry;
}

const DexEntry = ({ entry }: Props) => {
  return (
    <Col>
      <Card className={`entry-card ${!entry.caught && 'opacity-50'}`}>
        <Card.Header className="ps-2">
          <Row>
            <Col xs="4">
              <h6>#{entry.dexNum.toString().padStart(3, '0')}</h6>
            </Col>
            <Col className="ps-1">
              <h6>{entry.name}</h6>
            </Col>
          </Row>
        </Card.Header>
        <Card.Img src={entry.image} />
      </Card>
    </Col>
  );
};

export default DexEntry;

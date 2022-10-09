import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { PokedexEntry } from '../interfaces';

interface Props {
  entry: PokedexEntry;
  onToggle: (dexNum: number) => Promise<void>;
}

const DexEntry = ({ entry, onToggle }: Props) => {
  return (
    <Col>
      <Card
        className={`entry-card ${!entry.caught && 'opacity-50'}`}
        onDoubleClick={() => onToggle(entry.dexNum)}
      >
        <Card.Header className="ps-2">
          <Row className="flex-nowrap">
            <Col xs="4">
              <h6 className="text-nowrap">
                #{entry.dexNum.toString().padStart(3, '0')}
              </h6>
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

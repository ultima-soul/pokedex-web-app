import LogInButton from '../components/LogInButton';
import SignUpButton from '../components/SignUpButton';
import hero from '../images/hero.png';
import { Col, Container, Image, Row } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="col-xxl-8 px-4 py-5">
      <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
        <Col xs={10} sm={8} lg={6}>
          <Image
            src={hero}
            className="d-block mx-lg-auto shadow"
            fluid
            rounded
          />
        </Col>
        <Col lg={6}>
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Start tracking your progress
          </h1>
          <p className="lead">
            Easily track your progress for Pokédex completion. Monsters from the
            Gen 1 through 4 are able to be tracked with four regional Dexes and
            the National Dex. Double-click to toggle the capture status of a
            monster and see your overall progress on the Dashboard!
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <SignUpButton className="px-4 me-md-2" size="lg" />
            <LogInButton
              className="px-4"
              variant="outline-secondary"
              size="lg"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

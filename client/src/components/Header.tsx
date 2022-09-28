import { Button, Container, Navbar } from 'react-bootstrap';
import BootstrapIcons from 'bootstrap-icons/bootstrap-icons.svg';

const Header = () => {
  const JournalAlbum: string = `${BootstrapIcons}#journal-album`;

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <svg
            className="bi d-inline-block align-top me-2"
            width="30"
            height="30"
            fill="var(--bs-red)"
          >
            <use xlinkHref={JournalAlbum} />
          </svg>
          Pokédex
        </Navbar.Brand>

        <Container className="text-end">
          <Button variant="outline-light" className="me-2">
            Login
          </Button>
          <Button variant="warning">Sign-up</Button>
        </Container>
      </Container>
    </Navbar>
  );
};

export default Header;

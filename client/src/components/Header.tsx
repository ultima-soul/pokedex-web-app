import { Container, Nav, Navbar } from 'react-bootstrap';
import BootstrapIcons from 'bootstrap-icons/bootstrap-icons.svg';
import AuthenticationButtons from './AuthenticationButtons';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';

const Header = () => {
  const JournalAlbum: string = `${BootstrapIcons}#journal-album`;
  const { pathname }: { pathname: string } = useLocation();

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

        <Nav>
          <NavItem text="Home" to="/" currPage={pathname} />
          <NavItem text="Dashboard" to="/dashboard" currPage={pathname} />
        </Nav>

        <Container className="text-end">
          <AuthenticationButtons />
        </Container>
      </Container>
    </Navbar>
  );
};

export default Header;

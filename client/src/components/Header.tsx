import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import BootstrapIcons from 'bootstrap-icons/bootstrap-icons.svg';
import AuthenticationButtons from './AuthenticationButtons';
import { Link, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { isAuthenticated } = useAuth0();
  const JournalAlbum: string = `${BootstrapIcons}#journal-album`;

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to={isAuthenticated ? '/dashboard' : '/'}>
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
          {isAuthenticated ? (
            <>
              <Nav.Link as={NavLink} to="/dashboard">
                Dashboard
              </Nav.Link>
              <NavDropdown title="Dexes" menuVariant="dark">
                <NavDropdown.Item as={NavLink} to="/national-dex">
                  National
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/kanto-dex">
                  Kanto
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/johto-dex">
                  Johto
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/hoenn-dex">
                  Hoenn
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/sinnoh-dex">
                  Sinnoh
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
          )}
        </Nav>

        <Container className="text-end">
          <AuthenticationButtons />
        </Container>
      </Container>
    </Navbar>
  );
};

export default Header;

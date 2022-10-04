import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Props {
  text: string;
  to: string;
  currPage: string;
}

const NavItem = ({ text, to, currPage }: Props) => {
  const disabled = currPage === to;
  return (
    <Nav.Item>
      <Nav.Link as={Link} to={to} disabled={disabled}>
        {text}
      </Nav.Link>
    </Nav.Item>
  );
};

export default NavItem;

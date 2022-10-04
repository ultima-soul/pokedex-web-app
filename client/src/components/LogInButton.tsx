import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const LogInButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="outline-light"
      className="me-2"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
};

export default LogInButton;

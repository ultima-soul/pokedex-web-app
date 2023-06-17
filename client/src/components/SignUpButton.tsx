import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      variant="warning"
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            screen_hint: 'signup',
          },
        })
      }
    >
      Sign Up
    </Button>
  );
};

export default SignUpButton;

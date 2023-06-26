import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

interface Props {
  className?: string;
  size?: 'sm' | 'lg';
}

const SignUpButton = (props: Props) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      {...props}
      variant="warning"
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            screen_hint: 'signup',
          },
          appState: {
            returnTo: '/dashboard',
          },
        })
      }
    >
      Sign Up
    </Button>
  );
};

export default SignUpButton;

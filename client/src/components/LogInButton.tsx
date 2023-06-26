import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

interface Props {
  className?: string;
  variant?: string;
  size?: 'sm' | 'lg';
}

const LogInButton = ({ className, variant, size }: Props) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant={variant ?? 'outline-light'}
      className={className ?? 'me-2'}
      size={size}
      onClick={() =>
        loginWithRedirect({
          appState: {
            returnTo: '/dashboard',
          },
        })
      }
    >
      Log In
    </Button>
  );
};

export default LogInButton;

import { useAuth0 } from '@auth0/auth0-react';
import LogInButton from './LogInButton';
import LogOutButton from './LogOutButton';
import SignUpButton from './SignUpButton';

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <LogOutButton />
  ) : (
    <>
      <LogInButton />
      <SignUpButton />;
    </>
  );
};

export default AuthenticationButton;

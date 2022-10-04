import { withAuthenticationRequired } from '@auth0/auth0-react';

interface Props {
  page: React.ComponentType;
}

const ProtectedPage = ({ page }: Props) => {
  const Component = withAuthenticationRequired(page, {
    onRedirecting: () => <p>Loading...</p>,
  });

  return <Component />;
};

export default ProtectedPage;

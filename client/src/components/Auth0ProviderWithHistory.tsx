import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const Auth0ProviderWithHistory = ({ children }: Props) => {
  const navigate: NavigateFunction = useNavigate();

  const domain: string = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const onRedirectCallback = (appState?: AppState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;

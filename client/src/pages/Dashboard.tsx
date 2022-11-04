import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Container, Stack } from 'react-bootstrap';
import DexProgressCard from '../components/DexProgressCard';

const Dashboard = () => {
  const [caughtMons, setCaughtMons] = useState<number[]>([]);
  const serverUrl: string = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();

  const getCaughtMons = async (
    serverUrl: string,
    token: string
  ): Promise<number[]> => {
    const res = await fetch(`${serverUrl}/api/pokedex/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    return data.caughtMons;
  };

  useEffect(() => {
    const fetchCaughtMons = async () => {
      const token: string = await getAccessTokenSilently();
      const caughtMons: number[] = await getCaughtMons(serverUrl, token);

      setCaughtMons(caughtMons);
    };

    fetchCaughtMons();
  }, [getAccessTokenSilently, serverUrl]);

  return (
    <Container>
      <Stack gap={2} className="pt-5 col-6 mx-auto">
        <DexProgressCard
          dexName="National Dex"
          region="national"
          caughtMons={caughtMons}
          path="/national-dex"
        />
        <DexProgressCard
          dexName="Kanto Dex"
          region="kanto"
          caughtMons={caughtMons}
          path="/kanto-dex"
        />
        <DexProgressCard
          dexName="Johto Dex"
          region="original-johto"
          caughtMons={caughtMons}
          path="/johto-dex"
        />
        <DexProgressCard
          dexName="Hoenn Dex"
          region="hoenn"
          caughtMons={caughtMons}
          path="/hoenn-dex"
        />
        <DexProgressCard
          dexName="Sinnoh Dex"
          region="original-sinnoh"
          caughtMons={caughtMons}
          path="/sinnoh-dex"
        />
      </Stack>
    </Container>
  );
};

export default Dashboard;

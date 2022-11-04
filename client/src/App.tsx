import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProtectedPage from './components/ProtectedPage';
import NationalDex from './pages/NationalDex';
import KantoDex from './pages/KantoDex';
import JohtoDex from './pages/JohtoDex';
import HoennDex from './pages/HoennDex';
import SinnohDex from './pages/SinnohDex';

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedPage page={Dashboard} />} />
        <Route
          path="/national-dex"
          element={<ProtectedPage page={NationalDex} />}
        />
        <Route path="/kanto-dex" element={<ProtectedPage page={KantoDex} />} />
        <Route path="/johto-dex" element={<ProtectedPage page={JohtoDex} />} />
        <Route path="/hoenn-dex" element={<ProtectedPage page={HoennDex} />} />
        <Route
          path="/sinnoh-dex"
          element={<ProtectedPage page={SinnohDex} />}
        />
      </Routes>
    </>
  );
};

export default App;

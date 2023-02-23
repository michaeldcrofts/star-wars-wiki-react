import config from './config.json';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import CharacterListPage from './pages/CharacterListPage';
import PlanetListPage from './pages/PlanetListPage';
import StarshipListPage from './pages/StarshipListPage';
import FavouriteListPage from './pages/FavouriteListPage';
import SingleCharacterPage from './pages/SingleCharacterPage';
import SinglePlanetPage from './pages/SinglePlanetPage';
import SingleStarshipPage from './pages/SingleStarshipPage';
import SearchPage from './pages/SearchPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterListPage />} />
        <Route path="/character/" element={<CharacterListPage />} />
        <Route path="/planet/" element={<PlanetListPage />} />
        <Route path="/starship/" element={<StarshipListPage />} />
        <Route path="/favourite/" element={<FavouriteListPage />} />
        <Route path="/character/:id" element={<SingleCharacterPage />} />
        <Route path="/planet/:id" element={<SinglePlanetPage />} />
        <Route path="/starship/:id" element={<SingleStarshipPage />} />
        <Route path="/search/:searchText/:selectedOption" element={<SearchPage />} />
        <Route path="*" element={<CharacterListPage />} />
      </Routes>
    </Router>
  );
}

export const URLs = config;

export default App;

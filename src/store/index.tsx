import { combineReducers } from '@reduxjs/toolkit';

import { homeCharactersSlice } from './CharacterListSlice';
import { homePlanetsSlice } from './PlanetListSlice';
import { homeStarshipsSlice } from './StarshipListSlice';
import { characterSlice } from './SingleCharacterSlice';
import { planetSlice } from './SinglePlanetSlice';
import { starshipSlice } from './SingleStarshipSlice';
import { searchSlice } from './SearchSlice';
import { favouriteSlice } from './FavouriteSlice';

const rootReducer = combineReducers({
  homeCharacters: homeCharactersSlice.reducer,
  homePlanets: homePlanetsSlice.reducer,
  homeStarships: homeStarshipsSlice.reducer,
  character: characterSlice.reducer,
  planet: planetSlice.reducer,
  starship: starshipSlice.reducer,
  search: searchSlice.reducer,
  favourite: favouriteSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

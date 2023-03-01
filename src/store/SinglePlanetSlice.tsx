import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { cache } from './store';
import { URLs } from '../App';

import { Planet, Character, Film } from '../utils/interfaces';

export interface planetState {
  planet: Partial<Planet>;
  characters: Partial<Character>[];
  films: Partial<Film>[];
  loading: boolean;
  hasErrors: boolean;
}

const initialState: planetState = {
  planet: {},
  characters: [],
  films: [],
  loading: false,
  hasErrors: false,
};

export const planetSlice = createSlice({
  name: 'planet',
  initialState,
  reducers: {
    getPlanet: (state) => {
      state.loading = true;
    },
    getPlanetSuccess: (state, action: PayloadAction<Planet>) => {
      state.planet = action.payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getCharactersSuccess: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
    },
    getFilmsSuccess: (state, action: PayloadAction<Film[]>) => {
      state.films = action.payload;
    },
    getPlanetFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getPlanet, getPlanetSuccess, getCharactersSuccess, getFilmsSuccess, getPlanetFailure } = planetSlice.actions;

export const fetchPlanet = createAsyncThunk(
    'planet/fetchPlanet',
    // Return (via dispatch) Planet data from cache or by fetching from API
    async (searchTerm: string, { dispatch }) => {
        /*
          Utility function getData(url: string) returns data from cache if present or fetches from url if not.
        */
        async function getData(url: string): Promise<any> {
          // Check cache for data
          const cachedData = cache.get(url);
          if (cachedData) return Promise.resolve(cachedData);
          // Not in cache so retrieve from URL
          try {
            const response = await fetch(url);
            const data = await response.json();
            cache.set(url, data);
            return Promise.resolve(data);
          } catch (error) {
            return Promise.reject(error);
          }
        }
        dispatch(getPlanet());
        // Get all data associated with planet, including planet, films, starships, and vehicles
        const planet_URL = `${URLs.baseURL}${URLs.planetURI}${searchTerm}`;
        try {
          const planetData = await getData(planet_URL) as Planet;

          const getCharacters = planetData.residents.map(async (characterUrl) => {
            const characterData = await getData(characterUrl) as Character;
            return characterData;
          });

          const getFilms = planetData.films.map(async (filmUrl) => {
            const filmData = await getData(filmUrl) as Film;
            return filmData;
          });

          const [charactersData, filmsData] = await Promise.all([
            Promise.all(getCharacters),
            Promise.all(getFilms)
          ]);

          dispatch(getCharactersSuccess(charactersData));
          dispatch(getFilmsSuccess(filmsData));
          dispatch(getPlanetSuccess(planetData));
        } catch (error) {
          dispatch(getPlanetFailure());
        }
        return;
    }
);

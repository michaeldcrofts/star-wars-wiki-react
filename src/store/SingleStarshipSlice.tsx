import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { cache } from './store';
import { URLs } from '../App';

import { Starship, Character, Film } from '../utils/interfaces';

export interface starshipState {
  starship: Partial<Starship>;
  characters: Partial<Character>[];
  films: Partial<Film>[];
  loading: boolean;
  hasErrors: boolean;
}

const initialState: starshipState = {
  starship: {},
  characters: [],
  films: [],
  loading: false,
  hasErrors: false,
};

export const starshipSlice = createSlice({
  name: 'starship',
  initialState,
  reducers: {
    getStarship: (state) => {
      state.loading = true;
    },
    getStarshipSuccess: (state, action: PayloadAction<Starship>) => {
      state.starship = action.payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getCharactersSuccess: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
    },
    getFilmsSuccess: (state, action: PayloadAction<Film[]>) => {
      state.films = action.payload;
    },
    getStarshipFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getStarship, getStarshipSuccess, getCharactersSuccess, getFilmsSuccess, getStarshipFailure } = starshipSlice.actions;

export const fetchStarship = createAsyncThunk(
    'starship/fetchStarship',
    // Return (via dispatch) Starship data from cache or by fetching from API
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
        dispatch(getStarship());
        // Get all data associated with starship, including starship, films, starships, and vehicles
        const starship_URL = `${URLs.baseURL}${URLs.starshipURI}${searchTerm}`;
        try {
          const starshipData = await getData(starship_URL) as Starship;

          const getCharacters = starshipData.pilots.map(async (characterUrl) => {
            const characterData = await getData(characterUrl) as Character;
            return characterData;
          });

          const getFilms = starshipData.films.map(async (filmUrl) => {
            const filmData = await getData(filmUrl) as Film;
            return filmData;
          });

          const [charactersData, filmsData] = await Promise.all([
            Promise.all(getCharacters),
            Promise.all(getFilms)
          ]);

          dispatch(getCharactersSuccess(charactersData));
          dispatch(getFilmsSuccess(filmsData));
          dispatch(getStarshipSuccess(starshipData));
        } catch (error) {
          dispatch(getStarshipFailure());
        }
        return;
    }
);

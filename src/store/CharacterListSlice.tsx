import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { cache } from './store';
import { URLs } from '../App';

import { Character } from '../utils/interfaces';

export interface CharactersState {
  characters: Character[];
  loading: boolean;
  hasErrors: boolean;
}

const initialState: CharactersState = {
  characters: [],
  loading: false,
  hasErrors: false,
};

export const homeCharactersSlice = createSlice({
  name: 'homeCharacters',
  initialState,
  reducers: {
    getCharacters: (state) => {
      state.loading = true;
    },
    getCharactersSuccess: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getCharactersFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getCharacters, getCharactersSuccess, getCharactersFailure } = homeCharactersSlice.actions;

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacter',
    async (searchTerm: string, { dispatch, getState }) => {
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
            cache.set(url, data.results);
            return Promise.resolve(data.results);
          } catch (error) {
            return Promise.reject(error);
          }
        }

        dispatch(getCharacters());
        const URL = `${URLs.baseURL}${URLs.characterURI}${searchTerm}`;
        try {
            const searchData = await getData(URL);
            dispatch(getCharactersSuccess(searchData));
        } catch (error) {
            dispatch(getCharactersFailure());
        }

    }
);

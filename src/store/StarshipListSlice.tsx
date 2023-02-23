import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { cache } from './store';
import { URLs } from '../App';

import { Starship } from '../utils/interfaces';

export interface StarshipsState {
  starships: Starship[];
  loading: boolean;
  hasErrors: boolean;
}

const initialState: StarshipsState = {
  starships: [],
  loading: false,
  hasErrors: false,
};

export const homeStarshipsSlice = createSlice({
  name: 'homeStarships',
  initialState,
  reducers: {
    getStarships: (state) => {
      state.loading = true;
    },
    getStarshipsSuccess: (state, action: PayloadAction<Starship[]>) => {
      state.starships = action.payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getStarshipsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getStarships, getStarshipsSuccess, getStarshipsFailure } = homeStarshipsSlice.actions;

export const fetchStarships = createAsyncThunk(
    'starships/fetchStarship',
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
  
          dispatch(getStarships());
          const URL = `${URLs.baseURL}${URLs.starshipURI}${searchTerm}`;
          try {
              const searchData = await getData(URL);
              dispatch(getStarshipsSuccess(searchData));
            } catch (error) {
                dispatch(getStarshipsFailure());
            }
    }
);

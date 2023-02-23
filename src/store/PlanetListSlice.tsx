import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { cache } from './store';
import { URLs } from '../App';

import { Planet } from '../utils/interfaces';

export interface PlanetsState {
  planets: Planet[];
  loading: boolean;
  hasErrors: boolean;
}

const initialState: PlanetsState = {
  planets: [],
  loading: false,
  hasErrors: false,
};

export const homePlanetsSlice = createSlice({
  name: 'homePlanets',
  initialState,
  reducers: {
    getPlanets: (state) => {
      state.loading = true;
    },
    getPlanetsSuccess: (state, action: PayloadAction<Planet[]>) => {
      state.planets = action.payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getPlanetsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getPlanets, getPlanetsSuccess, getPlanetsFailure } = homePlanetsSlice.actions;

export const fetchPlanets = createAsyncThunk(
    'planets/fetchPlanet',
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
  
          dispatch(getPlanets());
          const URL = `${URLs.baseURL}${URLs.planetURI}${searchTerm}`;
          try {
              const searchData = await getData(URL);
              dispatch(getPlanetsSuccess(searchData));
            } catch (error) {
                dispatch(getPlanetsFailure());
            }
    }
);

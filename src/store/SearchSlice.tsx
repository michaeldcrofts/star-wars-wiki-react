import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { cache } from './store';
import { URLs } from '../App';

import { Character, Planet, Starship } from '../utils/interfaces';

export interface SearchState {
    results: Character[] | Planet[] | Starship[];
    loading: boolean;
    hasErrors: boolean;
  }

const initialState: SearchState = {
results: [],
loading: false,
hasErrors: false,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      getResults: (state) => {
        state.loading = true;
      },
      getSearchSuccess: (state, action: PayloadAction<Character[] | Planet[] | Starship[]>) => {
        state.results = action.payload;
        state.loading = false;
        state.hasErrors = false;
      },
      getSearchFailure: (state) => {
        state.loading = false;
        state.hasErrors = true;
      },
    },
});

export const { getResults, getSearchSuccess, getSearchFailure } = searchSlice.actions;

export const fetchResults = createAsyncThunk(
    'search',
    async (props: { searchText: string, selectedOption: string }, { dispatch }) => {
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
        dispatch(getResults());
        let searchUrl: string;
        let searchData: Character[] | Planet[] | Starship[];
        try {
            switch(props.selectedOption) {
                case "planet":
                    searchUrl = `${URLs.baseURL}${URLs.planetURI}?search=${props.searchText}`;
                    searchData = await getData(searchUrl) as Planet[];
                    break;
                case "starship":
                    searchUrl = `${URLs.baseURL}${URLs.starshipURI}?search=${props.searchText}`;
                    searchData = await getData(searchUrl) as Starship[];
                    break;
                default: // characters
                    searchUrl = `${URLs.baseURL}${URLs.characterURI}?search=${props.searchText}`;
                    searchData = await getData(searchUrl) as Character[];
            }
            dispatch(getSearchSuccess(searchData));
        } catch (error) {
            dispatch(getSearchFailure());
        }

    }
);

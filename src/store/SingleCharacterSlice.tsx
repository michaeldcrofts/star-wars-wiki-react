import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { cache } from './store';
import { URLs } from '../App';

import { Character, Planet, Film, Species, Starship, Vehicle } from '../utils/interfaces';

export interface characterState {
  character: Partial<Character>;
  planet: Partial<Planet>;
  films: Partial<Film>[];
  species: Partial<Species>[];
  starships: Partial<Starship>[];
  vehicles: Partial<Vehicle>[];
  favourite: boolean;
  loading: boolean;
  hasErrors: boolean;
}

const initialState: characterState = {
  character: {},
  planet: {},
  films: [],
  species: [],
  starships: [],
  vehicles: [],
  favourite: false,
  loading: false,
  hasErrors: false,
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    getCharacter: (state) => {
      state.loading = true;
    },
    getcharacterSuccess: (state, action: PayloadAction<Character>) => {
      state.character = action.payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getPlanetSuccess: (state, action: PayloadAction<Planet>) => {
      state.planet = action.payload;
    },
    getFilmsSuccess: (state, action: PayloadAction<Film[]>) => {
      state.films = action.payload;
    },
    getSpeciesSuccess: (state, action: PayloadAction<Species[]>) => {
      state.species = action.payload;
    },
    getStarshipsSuccess: (state, action: PayloadAction<Starship[]>) => {
      state.starships = action.payload;
    },
    getVehiclesSuccess: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload;
    },
    getCharacterFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getCharacter, getcharacterSuccess, getPlanetSuccess, getFilmsSuccess, getSpeciesSuccess, getStarshipsSuccess, getVehiclesSuccess, getCharacterFailure } = characterSlice.actions;

export const fetchCharacter = createAsyncThunk(
    'character/fetchCharacter',
    // Return (via dispatch) Character data from cache or by fetching from API
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
        dispatch(getCharacter());
        // Get all data associated with character, including planet, films, starships, and vehicles
        const character_URL = `${URLs.baseURL}${URLs.characterURI}${searchTerm}`;
        try {
          const characterData = await getData(character_URL) as Character;
          const planetData = await getData(characterData.homeworld) as Planet;
          const getFilms = characterData.films.map(async (filmUrl) => {
            const filmData = await getData(filmUrl) as Film;
            return filmData;
          });
          
          const getSpecies = characterData.species.map(async (speciesUrl) => {
            const speciesData = await getData(speciesUrl) as Species;
            return speciesData;
          });
          
          const getStarships = characterData.starships.map(async (starshipUrl) => {
            const starshipData = await getData(starshipUrl) as Starship;
            return starshipData;
          });
         
          const getVehicles = characterData.vehicles.map(async (vehicleUrl) => {
            const vehicleData = await getData(vehicleUrl) as Vehicle;
            return vehicleData;
          });

          const [filmsData, speciesData, starshipsData, vehiclesData] = await Promise.all([
            Promise.all(getFilms),
            Promise.all(getSpecies),
            Promise.all(getStarships),
            Promise.all(getVehicles),
          ]);
          
          dispatch(getVehiclesSuccess(vehiclesData));
          dispatch(getStarshipsSuccess(starshipsData));
          dispatch(getSpeciesSuccess(speciesData));
          dispatch(getFilmsSuccess(filmsData));
          dispatch(getPlanetSuccess(planetData));
          dispatch(getcharacterSuccess(characterData));
        } catch (error) {
          dispatch(getCharacterFailure());
        }
        return;
    }
);

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Character } from '../utils/interfaces';

export interface FavouriteState {
  favourites: {[key: string]: any};
}

const initialState: FavouriteState = {
  favourites: (localStorage.getItem("__star_wars_favourites__")) ? JSON.parse(localStorage.getItem("__star_wars_favourites__")!) : {},
};

export const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    getFavourites: (state) => {
      state.favourites = (localStorage.getItem("__star_wars_favourites__")) ? JSON.parse(localStorage.getItem("__star_wars_favourites__")!) : {};
    },
    removeFavouriteCharacter: (state, action: PayloadAction<Character | Partial<Character>>) => {
        const character = action.payload;
        if (state.favourites.hasOwnProperty(character.url!)) {
            delete state.favourites[character.url!];
            localStorage.setItem("__star_wars_favourites__", JSON.stringify(state.favourites));
        } 
    },
    addFavouriteCharacter: (state, action: PayloadAction<Character>) => {
        const character = action.payload;
        if (!state.favourites.hasOwnProperty(action.payload.url)) {
            Object.assign(state.favourites, {
                [character.url]: {
                    name: character.name,
                    height: character.height,
                    mass: character.mass,
                    gender: character.gender
                }
            });
            localStorage.setItem("__star_wars_favourites__", JSON.stringify(state.favourites));
        }
    },
  },
});

export const { getFavourites, removeFavouriteCharacter, addFavouriteCharacter } = favouriteSlice.actions;
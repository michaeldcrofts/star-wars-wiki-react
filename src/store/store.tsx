import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook, useStore } from 'react-redux';
import LRU from 'lru-cache';
import { RootState } from '.';

import rootReducer from '.';

export const cache = new LRU({
  max: 100
});

const store = configureStore({
  reducer: rootReducer
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<RootState>();

export default store;


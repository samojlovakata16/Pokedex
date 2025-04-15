import {configureStore} from '@reduxjs/toolkit';
import {pokemonReducer} from './pokemon';
import {useDispatch, TypedUseSelectorHook, useSelector} from 'react-redux';

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

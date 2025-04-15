import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAllPokemons, getPokemonById} from '../../api/pokemonApi';
import {BasicPokemon, Pokemon} from '../../types/domain/pokemon';

// Отримання базового списку покемонів
export const fetchPokemons = createAsyncThunk<
  BasicPokemon[],
  void,
  {rejectValue: string}
>('pokemons/fetch', async (_, {rejectWithValue}) => {
  try {
    return await getAllPokemons();
  } catch (e: any) {
    console.error('❌ fetchPokemons ERROR:', e?.message || e);
    return rejectWithValue('Failed to load Pokémons');
  }
});

// Отримання детального покемона за id
export const fetchPokemonById = createAsyncThunk<
  Pokemon,
  number,
  {rejectValue: string}
>('pokemons/fetchById', async (id, {rejectWithValue}) => {
  try {
    return await getPokemonById(id);
  } catch (e: any) {
    console.error('❌ fetchPokemonById ERROR:', e?.message || e);
    return rejectWithValue('Failed to load Pokémon details');
  }
});

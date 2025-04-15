import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {BasicPokemon, Pokemon} from '../types';
import {normalizePokemon} from '../utils/normalizePokemon';
import {getAllPokemons, getPokemonById} from '../api/pokemonApi';

interface PokemonState {
  byId: Record<number, BasicPokemon>;
  allIds: number[];
  detailsById: Record<number, Pokemon>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  loadingById: Record<number, boolean>;
  errorById: Record<number, string | null>;
}

const initialState: PokemonState = {
  byId: {},
  allIds: [],
  detailsById: {},
  status: 'idle',
  error: null,
  loadingById: {},
  errorById: {},
};

// Fetch base list of Pokémons
export const fetchPokemons = createAsyncThunk<
  BasicPokemon[],
  void,
  {rejectValue: string}
>('pokemons/fetch', async (_, {rejectWithValue}) => {
  try {
    return await getAllPokemons();
  } catch {
    return rejectWithValue('Failed to load Pokémons');
  }
});

// Fetch details by ID
export const fetchPokemonById = createAsyncThunk<
  Pokemon,
  number,
  {rejectValue: string}
>('pokemons/fetchById', async (id, {rejectWithValue}) => {
  try {
    return await getPokemonById(id);
  } catch {
    return rejectWithValue('Failed to load Pokémon details');
  }
});

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // base list
      .addCase(fetchPokemons.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchPokemons.fulfilled,
        (state, action: PayloadAction<BasicPokemon[]>) => {
          const newById: Record<number, BasicPokemon> = {};
          const newIds: number[] = [];

          action.payload.forEach(pokemon => {
            newById[pokemon.id] = pokemon;
            newIds.push(pokemon.id);
          });

          state.byId = newById;
          state.allIds = newIds;
          state.status = 'succeeded';
        },
      )
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error';
      })

      // details by id
      .addCase(fetchPokemonById.pending, (state, action) => {
        const id = action.meta.arg;
        state.loadingById[id] = true;
        state.errorById[id] = null;
      })
      .addCase(
        fetchPokemonById.fulfilled,
        (state, action: PayloadAction<Pokemon>) => {
          const normalized = normalizePokemon(action.payload);
          state.detailsById[normalized.id] = normalized;
          state.loadingById[normalized.id] = false;
        },
      )
      .addCase(fetchPokemonById.rejected, (state, action) => {
        const id = action.meta.arg;
        state.loadingById[id] = false;
        state.errorById[id] =
          action.payload ?? 'Failed to load Pokémon details';
      });
  },
});

export default pokemonSlice.reducer;

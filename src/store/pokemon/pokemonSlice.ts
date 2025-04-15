import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchPokemons, fetchPokemonById} from './pokemonThunks';
import {normalizePokemon} from '../../utils/normalizePokemon';
import {PokemonState} from '../../types/store/pokemonStore';
import {BasicPokemon, Pokemon} from '../../types/domain/pokemon';

const initialState: PokemonState = {
  byId: {},
  allIds: [],
  detailsById: {},
  status: 'idle',
  error: null,
  loadingById: {},
  errorById: {},
};

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Base list
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

      // Details by ID
      .addCase(fetchPokemonById.pending, (state, action) => {
        const id = action.meta.arg;
        state.loadingById[id] = true;
        state.errorById[id] = null; // обов'язково очищаємо
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

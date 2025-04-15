import {createSelector} from 'reselect';
import {RootState} from '../store';

export const selectPokemonStatus = (state: RootState) => state.pokemons.status;
export const selectPokemonError = (state: RootState) => state.pokemons.error;
export const selectPokemonByIdMap = (state: RootState) => state.pokemons.byId;
export const selectPokemonAllIds = (state: RootState) => state.pokemons.allIds;
export const selectPokemonDetailsMap = (state: RootState) =>
  state.pokemons.detailsById;

export const selectAllPokemonsMemoized = createSelector(
  [selectPokemonAllIds, selectPokemonByIdMap],
  (ids, byId) => ids.map(id => byId[id]),
);

export const selectFilteredPokemons = (search: string) =>
  createSelector([selectAllPokemonsMemoized], pokemons =>
    pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
  );

export const selectPokemonDetailsById = (id: number) => (state: RootState) =>
  state.pokemons.detailsById[id];

export const selectPokemonDetailsLoadingById =
  (id: number) => (state: RootState) =>
    state.pokemons.loadingById[id] ?? false;

export const selectPokemonDetailsErrorById =
  (id: number) => (state: RootState) =>
    state.pokemons.errorById[id] ?? null;

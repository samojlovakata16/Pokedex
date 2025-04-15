import {BasicPokemon, Pokemon} from '../domain/pokemon';

export type PokemonByIdMap = Record<number, BasicPokemon>;

export type PokemonDetailsByIdMap = Record<number, Pokemon>;

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ErrorMap = Record<number, string | null>;

export type LoadingMap = Record<number, boolean>;

export interface PokemonState {
  byId: PokemonByIdMap;
  allIds: number[];
  detailsById: PokemonDetailsByIdMap;
  status: StatusType;
  error: string | null;
  loadingById: LoadingMap;
  errorById: ErrorMap;
}

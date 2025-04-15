import {BasicPokemon} from './pokemon';

export type RootStackParamList = {
  Home: undefined;
  Details: {pokemon: BasicPokemon};
};

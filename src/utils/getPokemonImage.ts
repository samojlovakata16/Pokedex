import images from './pokemonImages';

export const getPokemonImage = (id: number): number | undefined => {
  return images[id];
};

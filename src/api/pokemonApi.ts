import axiosInstance from './axiosInstance';
import {BasicPokemon, Pokemon} from '../types/domain/pokemon';

export async function getAllPokemons(): Promise<BasicPokemon[]> {
  const res = await axiosInstance.get('/pokemon?limit=151');
  return res.data.results.map(
    (pokemon: {name: string}, index: number): BasicPokemon => ({
      id: index + 1,
      name: pokemon.name,
    }),
  );
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  const res = await axiosInstance.get(`/pokemon/${id}`);
  return res.data;
}

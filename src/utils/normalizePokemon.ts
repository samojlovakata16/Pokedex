import {Pokemon} from '../types/domain/pokemon';

export function normalizePokemon(data: Pokemon) {
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    base_experience: data.base_experience,
    types: data.types,
    stats: data.stats,
  };
}

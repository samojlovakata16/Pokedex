import {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  fetchPokemonById,
  selectPokemonDetailsById,
  selectPokemonDetailsErrorById,
  selectPokemonDetailsLoadingById,
} from '../store/pokemon';

const dispatchedIds = new Set<number>(); // 👈 глобальна памʼять, які ID вже диспатчились

export function usePokemonDetails(pokemonId: number) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectPokemonDetailsById(pokemonId));
  const loading = useAppSelector(selectPokemonDetailsLoadingById(pokemonId));
  const error = useAppSelector(selectPokemonDetailsErrorById(pokemonId));

  useEffect(() => {
    if (!data && !loading && error === null && !dispatchedIds.has(pokemonId)) {
      dispatchedIds.add(pokemonId);
      dispatch(fetchPokemonById(pokemonId));
    }
  }, [data, loading, error, pokemonId, dispatch]);

  const types = useMemo(() => {
    if (!data?.types) return 'Unknown';
    return data.types.map(t => t.type.name).join(', ');
  }, [data]);

  const stats = useMemo(() => {
    if (!data?.stats) return [];
    return data.stats.map(
      stat => `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`,
    );
  }, [data]);

  return {data, loading, error, types, stats};
}

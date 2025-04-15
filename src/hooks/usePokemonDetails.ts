import {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {
  selectPokemonDetailsById,
  selectPokemonDetailsErrorById,
  selectPokemonDetailsLoadingById,
} from '../redux/pokemonSelectors';
import {fetchPokemonById} from '../redux/pokemonSlice';

export function usePokemonDetails(pokemonId: number) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectPokemonDetailsById(pokemonId));
  const loading = useAppSelector(selectPokemonDetailsLoadingById(pokemonId));
  const error = useAppSelector(selectPokemonDetailsErrorById(pokemonId));

  useEffect(() => {
    if (!data && !loading && !error) {
      dispatch(fetchPokemonById(pokemonId));
    }
  }, [data, loading, error, dispatch, pokemonId]);

  const types = useMemo(() => {
    if (!data?.types) {
      return 'Unknown';
    }
    return data.types.map(t => t.type.name).join(', ');
  }, [data]);

  const stats = useMemo(() => {
    if (!data?.stats) {
      return [];
    }
    return data.stats.map(
      stat => `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`,
    );
  }, [data]);

  return {data, loading, error, types, stats};
}

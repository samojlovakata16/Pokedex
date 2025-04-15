import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  fetchPokemons,
  selectFilteredPokemons,
  selectPokemonError,
  selectPokemonStatus,
} from '../store/pokemon';

export function usePokemonList() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectPokemonStatus);
  const error = useAppSelector(selectPokemonError);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemons());
    }
  }, [dispatch, status]);

  const filtered = useAppSelector(selectFilteredPokemons(search));

  return {status, error, filtered, search, setSearch};
}

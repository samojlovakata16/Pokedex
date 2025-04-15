import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {fetchPokemons} from '../redux/pokemonSlice';
import {
  selectFilteredPokemons,
  selectPokemonError,
  selectPokemonStatus,
} from '../redux/pokemonSelectors';

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

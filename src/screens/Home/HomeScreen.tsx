import {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PokemonList from './components/PokemonList';
import {usePokemonList} from '../../hooks/usePokemonList';
import PokemonCard from '../../components/PokemonCard';
import StatusMessage from '../../components/StatusMessage';
import SearchBar from '../../components/SearchBar';
import {RootStackParamList} from '../../types/navigation';
import {BasicPokemon} from '../../types/domain/pokemon';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  const {filtered, search, setSearch, status, error} = usePokemonList();

  const renderItem = useCallback(
    ({item}: {item: BasicPokemon}) => (
      <PokemonCard
        pokemon={item}
        onPress={() => navigation.navigate('Details', {pokemon: item})}
      />
    ),
    [navigation],
  );

  const _keyExtractor = useCallback(
    (item: BasicPokemon) => item.id.toString(),
    [],
  );

  if (status === 'loading') {
    return <StatusMessage text="Loading..." isLoading />;
  }

  if (status === 'failed') {
    return <StatusMessage text={`Error: ${error}`} isError />;
  }

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChange={setSearch} />
      {filtered.length === 0 ? (
        <StatusMessage text="No Pokémon found 😢" />
      ) : (
        <PokemonList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={_keyExtractor}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 20,
  },
});

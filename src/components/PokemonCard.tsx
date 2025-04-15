import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {getPokemonImage} from '../utils/getPokemonImage';
import PlaceholderPokemon from './PlaceholderPokemon';

interface Props {
  pokemon: {id: number; name: string};
  onPress: () => void;
}

function PokemonCard({pokemon, onPress}: Props) {
  const imgSrc = getPokemonImage(pokemon.id);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {imgSrc ? (
        <Image source={imgSrc} style={styles.image} />
      ) : (
        <PlaceholderPokemon />
      )}
      <Text style={styles.text}>
        {pokemon.id}. {pokemon.name}
      </Text>
    </TouchableOpacity>
  );
}

export default React.memo(PokemonCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  text: {
    fontSize: 16,
  },
});

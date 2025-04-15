import React from 'react';
import {StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {BasicPokemon} from '../../../types/domain/pokemon';

interface Props {
  data: BasicPokemon[];
  renderItem: ({item}: {item: BasicPokemon}) => JSX.Element;
  keyExtractor: (item: BasicPokemon) => string;
}

export default function PokemonList({data, renderItem, keyExtractor}: Props) {
  return (
    <FlashList
      data={data}
      estimatedItemSize={50}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
});

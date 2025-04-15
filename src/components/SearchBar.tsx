import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

function SearchBar({value, onChange}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

export default React.memo(SearchBar);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 1,
  },
});

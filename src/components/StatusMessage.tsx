import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

type Props = {
  text: string;
  isError?: boolean;
  isLoading?: boolean;
};

function StatusMessageComponent({
  text,
  isError = false,
  isLoading = false,
}: Props) {
  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color="#FF0000" />}
      <Text
        style={[
          styles.message,
          isError && styles.error,
          isLoading && styles.loadingText,
        ]}>
        {text}
      </Text>
    </View>
  );
}

export default React.memo(StatusMessageComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
  },
  error: {
    color: 'red',
  },
});

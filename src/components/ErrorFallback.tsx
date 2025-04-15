import React from 'react';
import {Button, View, StyleSheet} from 'react-native';
import StatusMessage from './StatusMessage';

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

function ErrorFallback({error, resetErrorBoundary}: Props) {
  return (
    <View style={styles.container}>
      <StatusMessage text={error.message} isError />
      <View style={styles.buttonWrapper}>
        <Button
          title="Try again"
          onPress={resetErrorBoundary}
          testID="retry-button"
        />
      </View>
    </View>
  );
}

export default React.memo(ErrorFallback);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
});

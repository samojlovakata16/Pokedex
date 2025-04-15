import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AppNavigation from './src/navigation';
import {ErrorBoundary} from 'react-error-boundary';
import RNRestart from 'react-native-restart';
import ErrorFallback from './src/components/ErrorFallback';
import {store} from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          RNRestart.Restart();
        }}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </ErrorBoundary>
    </Provider>
  );
}

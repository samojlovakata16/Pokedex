import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigation from './src/navigation';
import {ErrorBoundary} from 'react-error-boundary';
import RNRestart from 'react-native-restart';
import ErrorFallback from './src/components/ErrorFallback';

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

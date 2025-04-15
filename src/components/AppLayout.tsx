import React from 'react';
import {
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  ViewStyle,
} from 'react-native';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function AppLayout({children}: Props) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0,
    backgroundColor: '#fff',
  } as ViewStyle,
});

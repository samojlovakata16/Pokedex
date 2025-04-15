import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import {RootStackParamList} from '../types/navigation';
import DetailsScreen from '../screens/Details/DetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Pokédex',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'red',
            fontWeight: 'bold',
            fontSize: 22,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

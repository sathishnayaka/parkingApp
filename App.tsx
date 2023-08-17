/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/Home';
import ParkingLots from './src/ParkingLots';
import Registration from './src/Registration';
import Price from './src/Price';


import { Provider } from 'react-redux'
import store from './src/redux/store';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const Stack = createNativeStackNavigator();


  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="parking-app" component={Home} />
      <Stack.Screen name="parking-slots" component={ParkingLots} />
      <Stack.Screen name="vechile-registration" component={Registration} />
      <Stack.Screen name="Price-details" component={Price} />
    </Stack.Navigator>
  </NavigationContainer>
  </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
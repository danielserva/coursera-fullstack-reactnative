import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Main from './components/MainComponent';

export default function App() {
  return (
    <NavigationContainer>{<Main />}</NavigationContainer>
    
  );
}


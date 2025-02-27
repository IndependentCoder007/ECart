import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './stackNavigations';

export default function RootNavigation() {
    return (
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    );
  }
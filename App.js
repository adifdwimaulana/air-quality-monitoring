import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Home from './src/components/Home';
import Login from './src/components/Login';
import Register from './src/components/Register';
import Splash from './src/components/Splash';
import './src/config';
import firebase from 'firebase';

console.disableYellowBox = true;

const Stack = createStackNavigator(
  {
    Login,
    Register,
  },
)

const Switch = createSwitchNavigator(
  {
    Home,
    Splash,
    Stack,
  },
  {
    initialRouteName: 'Splash'
  }
)

export default createAppContainer(Switch)
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import appConfig from '../../../app.json';

// ## View Imports ##
import LoginView from '../views/Login';
import MainView from '../views/Main';

const StackNavigatorConfig = {
  navigationOptions: {}
  //headerMode: 'none',
};

export default StackNavigator(
  {
    Login: { screen: LoginView },
    Main: { screen: MainView, },
    // ## End StackNavigator Views ##
  },
  StackNavigatorConfig,
);

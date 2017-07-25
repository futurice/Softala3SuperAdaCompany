import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import persistStore from './src/utils/persist';
import store from './src/redux/store';
import AppView from './src/modules/AppView';
// import SplashScreen from 'react-native-smart-splash-screen'

export default class SuperAdaCompanyApp extends Component {

  // componentDidMount () {
  //   SplashScreen.close(SplashScreen.animationType.scale, 800, 500)
  // },

  state = { rehydrated: false };

  componentWillMount() {
    persistStore(store, () => this.setState({ rehydrated: true }));
  };

  render() {
    const { rehydrated } = this.state;

    return (
      <Provider store={store}>
        <AppView isReady={rehydrated} />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('SuperAdaCompanyApp', () => SuperAdaCompanyApp);

import { Provider } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { AppRegistry, BackHandler } from 'react-native';

import persistStore from './src/utils/persist';
import store from './src/redux/store';
import AppView from './src/modules/AppView';
import React from 'react';
import {
  BackAndroid,
  StatusBar,
  View
} from 'react-native';
import { NavigationStateActions } from 'react-navigation';
// import SplashScreen from 'react-native-smart-splash-screen';

export default class SuperAdaCompanyApp extends React.Component {
  state = { rehydrated: false }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
    persistStore(store, () => this.setState({ rehydrated: true }));
  }

  navigateBack() {
    const navigatorState = store.getState().navigationState;
    const tabs = navigatorState.tabs;
    const tabKey = tabs.routes[tabs.index].key;
    const currentTab = navigatorState[tabKey];

    // If we are in the beginning of our tab stack :3
    if (currentTab.index === 0) {

      // if we are not in the first tab, switch tab to the leftmost one
      if (tabs.index !== 0) {
        store.dispatch(NavigationActions.back());
        return true;
      }

      // otherwise let OS handle the back button action
      return false;
    }

    store.dispatch(NavigationActions.back());
    return true;
  }

  componentDidMount () {
    // SplashScreen.close(SplashScreen.animationType.scale, 850, 500);
  }

  render() {
    const { rehydrated } = this.state;

    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar
            animated={false}
            backgroundColor="#fe9593"
            barStyle="light-content"
          />
          <AppView isReady={rehydrated}/>
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('SuperAdaCompanyApp', () => SuperAdaCompanyApp);

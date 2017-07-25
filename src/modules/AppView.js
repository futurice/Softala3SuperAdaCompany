import React, {PropTypes} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import NavigatorView from './navigator/NavigatorView';
import LoginViewContainer from './login/LoginViewContainer';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../states/SessionState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';
import {setConfiguration} from '../utils/configuration';

const apiRoot = __DEV__ ? 'http://localhost:3000' : 'https://superada.herokuapp.com';

const AppView = React.createClass({
  componentDidMount() {
    setConfiguration('API_ROOT', apiRoot);

    // snapshotUtil.resetSnapshot()
    //   .then(snapshot => {
    //     const {dispatch} = this.props;

    //     if (snapshot) {
    //       // Make sure our API call in progress vars are false
    //       snapshot.auth && (snapshot.auth.loading = false);
    //       snapshot.teamList && (snapshot.teamList.loading = false);
    //       snapshot.teamPoints && (snapshot.teamPoints.loading = false);

    //       dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
    //     } else {
    //       dispatch(SessionStateActions.initializeSessionState());
    //     }

    //     store.subscribe(() => {
    //       snapshotUtil.saveSnapshot(store.getState());
    //     });
    //   });
  },

  render() {
    if (false && !this.props.isReady) {
      return (
        <View style={{flex: 1, backgroundColor:'#ed3a4b'}}>
          <ActivityIndicator color={"#FFF"} size={'large'} style={styles.centered}/>
        </View>
      );
    } else if (!this.props.isLoggedIn) {
      return (
        <View style={{flex: 1}}>
          <LoginViewContainer/>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        <NavigatorView />
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});

export default AppView;

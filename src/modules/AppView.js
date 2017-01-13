import React, {PropTypes} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import LoginViewContainer from './login/LoginViewContainer';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';
import {setConfiguration} from '../utils/configuration';

const apiRoot = __DEV__ ? 'http://localhost:3000' : 'https://superada.herokuapp.com';

const AppView = React.createClass({
  componentDidMount() {
    setConfiguration('API_ROOT', apiRoot);
    snapshotUtil.resetSnapshot()
      .then(snapshot => {
        const {dispatch} = this.props;

        if (snapshot) {
          // Make sure our API call in progress vars are false
          snapshot.auth && (snapshot.auth.loading = false);
          snapshot.teamDetails && (snapshot.teamDetails.loading = false);
          snapshot.companyPoints && (snapshot.companyPoints.loading = false);
          snapshot.feedback && (snapshot.feedback.loading = false);
          snapshot.companies && (snapshot.companies.loading = false);

          dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
        } else {
          dispatch(SessionStateActions.initializeSessionState());
        }

        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  },

  render() {
    if (!this.props.isReady) {
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
        <NavigationViewContainer />
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

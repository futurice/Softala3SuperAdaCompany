import React, {PropTypes} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import NavigatorView from './views/NavigatorView';
import * as SessionStateActions from '../states/SessionState';
import DeveloperMenu from '../components/DeveloperMenu';
const apiRoot = __DEV__ ? 'http://localhost:3000' : 'https://superada.herokuapp.com';

export class AppView extends React.Component {
  static displayName = 'AppView';

  static propTypes = {
    isReady: PropTypes.bool.isRequired,
  };

  render() {
    if (!this.props.isReady) {
      return (
        <View style={{flex: 1, backgroundColor:'#ed3a4b'}}>
          <ActivityIndicator color={"#FFF"} size={'large'} style={styles.centered}/>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <NavigatorView />
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});

export default AppView;

import React, {PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import * as NavigationState from '../../modules/navigation/NavigationState';

const Welcome = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      username: '',
      password: '',
      background: 'rgba(255,0,54,1)'
    };
  },

  profile() {
    this.props.dispatch(NavigationState.switchTab('ProfileTab'));
  },

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{
          alignItems: 'center'
        }}>
          <Text style={styles.titleText}>
              Tervetuloa!
          </Text>
          <Image style={styles.image} source={require('../../../images/tervetuloa.png')}/>
          <Text style={styles.textStyle}>
            Kahdeksan rastia odottavat sinua!
            Jokaisella rastilla suoritetaan tehtävä.
            Rasteja pitävät yritykset ja oppilaitokset
            kirjaavat rastisuoritukset puolestanne
          </Text>
          <Text style={styles.textStyle}>
            Kannattaa pelata läpi myös Super-Ada Quiz.
            Tasapistetilanteessa hyvin suoritettu Quiz ratkaisee voiton.
          </Text>
          <Text style={styles.textStyle}>
            ONNEA MATKAAN!
          </Text>
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={this.profile}>
            <Text style={styles.whiteFont}>MUOKKAA TIIMIÄ</Text>
        </TouchableOpacity>
      </View>

    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ed3a4b',
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  titleText: {
    paddingTop: 20,
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center'
  },
  image: {
    resizeMode: 'contain',
    height: 200,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fe9593',
    padding: 20,
    margin: 20,
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  textContainer: {
  },
  whiteFont: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  textStyle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    textAlign: 'center'
  }
});
export default Welcome;

import React, {PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  AsyncStorage
} from 'react-native';
import {post} from '../../utils/api';
import {setAuthenticationToken} from '../../utils/authentication'
import * as NavigationState from '../../modules/navigation/NavigationState';

const LoginView = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      username: '',
      teamid: '',
      token: '',
      teamname: '',
      background: 'rgba(255,0,54,1)'
    }
  },

  async _userLogin() {
    try {
      const response = await post('/teams/authenticate', {
          name: this.state.teamname.trim()
      });

      await setAuthenticationToken(response.token.token);

      this.validate();
    } catch (e) {
      Alert.alert(
        'Virhe kirjautumisessa',
        e.status === 401 || e.status === 400 ? 'Tarkista joukkueen nimi' : e.toString(),
        [
          {text: 'OK'}
        ]
      );
    }
  },

  async validate() {
    try {
      //taken elsewhere
      //await AsyncStorage.setItem('token', this.state.token);
      await AsyncStorage.setItem('teamname', this.state.teamname);
      this.props.dispatch(NavigationState.switchTab('HomeTab'));
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  },

  render() {
    return (
      <View style={[styles.container, {backgroundColor: '#ed3a4b'}]}>
        <StatusBar
          backgroundColor="#ed3a4b"
          animated={false}
          barStyle="light-content"
        />
        <View style={styles.header}>
            <Image style={styles.mark} source={require('../../../images/superada_transparent.png')}/>
        </View>
          <View style={styles.inputs}>
            <View style={styles.inputContainer}>
               <Text style={styles.textstyle}>Joukkueen nimi:</Text>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                onChangeText={(teamname) => this.setState({teamname})}
                value={this.state.teamname}
              />
            </View>
          </View>
          <TouchableOpacity onPress={this._userLogin}>
            <View style={styles.button}>
              <Text style={styles.whiteFont}>KIRJAUDU SISÄÄN</Text>
            </View>
          </TouchableOpacity>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent'
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0,
    backgroundColor: 'transparent'
  },
  mark: {
    width: 150,
    height: 150
  },
  button: {
    backgroundColor: '#fe9593',
    padding: 20,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 90,
    alignItems: 'center'
  },
  inputs: {
    marginTop: 2,
    marginBottom: 2,
    flex: .25
  },
  inputContainer: {
    padding: 35,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  input: {
    position: 'absolute',
    left: 30,
    top: 60,
    right: 30,
    height: 45,
    fontSize: 20
  },
  inputText: {
    width: 300,
    height: 70,
    borderColor: '#FFF',
    borderWidth: 1
  },
  whiteFont: {
    fontSize: 18,
    color: '#FFF'
  },
  textstyle: {
    color: '#FFF',
    fontSize: 20
  },
  debug: {
    color: '#FFF',
    marginBottom: 15,
    marginLeft: 20
  }
});
export default LoginView;

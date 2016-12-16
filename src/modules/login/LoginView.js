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
  AsyncStorage,
  ActivityIndicator
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
      background: 'rgba(255,0,54,1)',
      loading: false
    }
  },

  async _userLogin() {
    try {
      this.setState({ loading: true });
      const response = await post('/teams/authenticate', {
          name: this.state.teamname.trim()
      });

      await setAuthenticationToken(response.token.token);

      this.setState({ loading: false }, () => {
        this.validate();
      });
    } catch (e) {
      this.setState({ loading: false });
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
                autoCorrect={false}
                underlineColorAndroid='#000'
                selectionColor='#000'
              />
            </View>
          </View>
          <View style={styles.loginButtonContainer}>
            <TouchableOpacity disabled={this.state.loading} onPress={this._userLogin} style={this.state.loading ? styles.loginButtonLoading : styles.loginButton}>
              <Text style={styles.whiteFont}>KIRJAUDU SISÄÄN</Text>
            </TouchableOpacity>
            { this.state.loading &&
              <ActivityIndicator animating={true} color={'#FFF'} style={{zIndex: 1000, position: 'absolute', height: 70, width: 70}} size="large" />
            }
          </View>
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
  loginButtonContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    margin: 20,
  },
  loginButton: {
    backgroundColor: '#fe9593',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 70,
    padding: 20
  },
  loginButtonLoading: {
    backgroundColor: '#f14c59',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 70,
    padding: 20
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
    fontSize: 20,

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

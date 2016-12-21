import React, {PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
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

  login() {
    this.props.login(this.state.teamname.trim());
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

  errToString(err) {
    if (!err) {
      return '';
    }

    if (err.message) {
      return err.message;
    }

    return String(err);
  },

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#ed3a4b"
          animated={false}
          barStyle="light-content"
        />
        <ScrollView style={{flex: 1, alignSelf: 'stretch'}} contentContainerStyle={{
          alignItems: 'center'
        }}>
          <Image style={styles.logo} source={require('../../../images/superada_transparent.png')}/>
          <View style={styles.inputContainer}>
            <Text style={styles.whiteFont}>Joukkueen nimi:</Text>
            <TextInput
              style={[styles.input, styles.whiteFont]}
              onChangeText={(teamname) => this.setState({teamname})}
              value={this.state.teamname}
              autoCorrect={false}
              underlineColorAndroid='#000'
              selectionColor='#000'
            />
          </View>
          <View style={styles.errContainer}>
            <Text style={styles.whiteFont}>
              { this.errToString(this.props.auth.error) }
            </Text>
          </View>
        </ScrollView>

        <View style={styles.loginButtonContainer}>
          <TouchableOpacity disabled={this.props.auth.loading} onPress={this.login} style={this.state.loading ? styles.loginButtonLoading : styles.loginButton}>
            <Text style={styles.whiteFont}>KIRJAUDU SISÄÄN</Text>
          </TouchableOpacity>
          { this.props.auth.loading &&
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ed3a4b'
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0,
    backgroundColor: 'transparent'
  },
  logo: {
    width: 150,
    height: 150
  },
  errContainer: {
    flexGrow: 1
  },
  loginButtonContainer: {
    backgroundColor: '#ed3a4b',
    elevation: 5,
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
  inputContainer: {
    padding: 35,
    borderWidth: 1,
    alignSelf: 'stretch',
    borderColor: 'transparent'
  },
  input: {
    height: 45,
    fontSize: 20,
  },
  whiteFont: {
    fontSize: 18,
    color: '#FFF'
  },
  debug: {
    color: '#FFF',
    marginBottom: 15,
    marginLeft: 20
  }
});
export default LoginView;

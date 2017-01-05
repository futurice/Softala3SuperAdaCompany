import React, {PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

import {get} from '../../utils/api';

const TeamPointsView = React.createClass({
  getInitialState() {
    return {
      value: 0,
      background: 'rgba(255,0,54,1)'
    }
  },

  async componentDidMount() {
    this.props.refresh();
  },

  render() {
    var _scrollView: ScrollView;
      return (
       <View style= {[styles.container, {backgroundColor: this.state.background}]}>
        <ScrollView ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          style={styles.scrollView}>
          <Text style={styles.headerText}>Tiimisi pisteet!</Text>
          <View style={styles.header}>
            <Image style={styles.mark} source={require('../../../images/pisteet.png')}/>
          </View>
          <View style={styles.pointBox}>
            <Text style={styles.points}>{this.props.companyPoints.data.sum || 0}/40</Text>
          </View>
            <Text style={styles.baseText}>Haluatko antaa järjestäjille palautetta?</Text>
          <View style ={styles.buttons}>
            <TouchableOpacity onPress={this.props.feedback}>
              <View style={styles.button}>
                <Text style={styles.whiteFont}>KYLLÄ</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.goodbye}>
              <View style={styles.button}>
                <Text style={styles.whiteFont}>EI</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
});



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  scrollView: {
    backgroundColor: 'rgba(255,0,54,1)',
    flex: 1,
  },
  mark: {
    alignItems: 'center',
    height: 200,
    width: 150
  },
  headerText: {
    marginLeft: 10,
    marginTop: 30,
    marginRight: 10,
    fontSize: 30,
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
    //fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  pointBox: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30
  },
  points: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: 'bold'
  },
  baseText: {
    marginTop: 10,
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FF8A8C',
    padding: 15,
    marginTop: 40,
    marginRight: 10,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 70,
  },
  whiteFont: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
export default TeamPointsView;

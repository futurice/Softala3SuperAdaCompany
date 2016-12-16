import React, {PropTypes, Dimensions, Component} from 'react';

import PhotoView from 'react-native-photo-view';

import{
  Image,
  Text,
  View,
  StyleSheet,
  AppRegistry,
  ScrollView,
  TouchableOpacity,
  zoomEnabled,
  maximumZoomScale,
  minimumZoomScale,
  Platform,

}from 'react-native';

import * as NavigationState from '../../modules/navigation/NavigationState';


const MapView = React.createClass({
  PropTypes: {
    dispatch: PropTypes.func.isRequired
  },
  popRoute(){
    this.props.dispatch(NavigationState.popRoute({
      key:'CounterView',
    }));
  },

  getInitialState(){
    return{
      background: 'rgba(255,0,54,1)'
    };
  },

  render(){
    const text = 'kartta';

    return(
      <View style={styles.MapContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.popRoute} style={{zIndex: 1000, top: 0, left: 0, position: 'absolute'}}>
            <Image style={{resizeMode: 'contain', width: 64, height: 64, zIndex: 1000 }} source={require('../../../images/back_arrow.png')}/>
          </TouchableOpacity>
          <Text style={styles.headerText}>
            Kartta
          </Text>
        </View>
        <PhotoView
          minimumZoomScale={1}
          maximumZoomScale={3}
          androidScaleType="fitCenter"
          source={require('../../../images/map.png')}
          style={styles.MapImage}
        />
      </View>
    );
  }
});

let styles = {};

if (Platform.OS === 'ios') {
  styles = StyleSheet.create({
    header: {
      alignSelf: 'stretch',
      backgroundColor: '#fe9593',
      height: 64,
      justifyContent: 'center'
    },
    headerText: {
      textAlign: 'center',
      color: '#FFF',
      fontSize: 32,
      fontWeight: 'bold',
    },
    MapContainer: {
      flex: 1,
      backgroundColor: '#fafafa',
      //alignItems: 'stretch',
    },

    MapImage: {
      flex: 1,
      height: 300,
      width: 300,
    },

  });
} else {
  styles = StyleSheet.create({
    header: {
      alignSelf: 'stretch',
      backgroundColor: '#fe9593',
      elevation: 5,
      height: 64,
      justifyContent: 'center'
    },
    headerText: {
      textAlign: 'center',
      color: '#FFF',
      fontSize: 32,
      fontWeight: 'bold',
    },
    MapContainer: {
      flex: 1,
      backgroundColor: '#fafafa',
      //alignItems: 'stretch',
    },

    MapImage: {
      flex: 1,
      height: 300,
    },

  });
}

export default MapView;

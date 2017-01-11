import React, {Component} from 'react';
import PhotoView from 'react-native-photo-view';

import{
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import * as NavigationState from '../../modules/navigation/NavigationState';
import AppStyles from '../AppStyles';

import {getConfiguration} from '../../utils/configuration';

const MapView = React.createClass({
  render() {
    return (
      <View style={styles.MapContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.props.back} style={{zIndex: 1000, top: 0, left: 0, position: 'absolute'}}>
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
          source={{uri: `${getConfiguration('API_ROOT')}/map.png`}}
          style={styles.MapImage}
        />
      </View>
    );
  }
});

let styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    backgroundColor: AppStyles.lightRed,
    elevation: AppStyles.headerElevation,
    height: AppStyles.headerHeight,
    justifyContent: 'center'
  },
  headerText: {
    textAlign: 'center',
    color: AppStyles.white,
    fontSize: AppStyles.headerFontSize,
    fontWeight: 'bold',
  },
  MapContainer: {
    flex: 1,
    backgroundColor: AppStyles.whiteBackground,
  },
  MapImage: {
    flex: 1,
    height: 300,
    // welp, for some reason iOS breaks if we don't specify a width,
    // and Android breaks if we do
    width: Platform.OS === 'ios' ? 300 : undefined
  }
});

export default MapView;

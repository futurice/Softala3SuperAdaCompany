import React, { Component, PropTypes } from 'react';
import { Image, TouchableOpacity } from 'react-native';

export default class StarView extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <Image
          source={this.props.source}
          style={this.props.style}
          onLayout={this.props.onLayoutFunc}
        />
      </TouchableOpacity>)
  }
  _onPress = () => {
    var starNumber = this.props.starNumber;
    this.props.onPress(starNumber);
  }
}
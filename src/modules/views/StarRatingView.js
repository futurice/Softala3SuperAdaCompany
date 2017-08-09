'use strict';

import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
  View,
  StyleSheet,
} from 'react-native';

import StarView from './StarView';

export default class StarRatingView extends React.Component {
  static defaultProps = {
    maxStars: 5,
    rating: 0,
    starSize: -1,
    interitemSpacing: 0,
    valueChanged: (index) => {},
  };
  static propTypes = {
    maxStars: PropTypes.number,
    rating: PropTypes.number,
    unSelectStar: PropTypes.number.isRequired,
    selectStar: PropTypes.number.isRequired,
    valueChanged: PropTypes.func,
    starSize: PropTypes.number,
    interitemSpacing: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      maxStars: this.props.maxStars,
      rating: this.props.rating,
      firstImageLayout: null,
      starSize: this.props.starSize,
    };
    this.onLayoutChanged = this.onLayoutChanged.bind(this);
    this.onStarPressed = this.onStarPressed.bind(this);
  }

  render() {
    var starArray = [];
    var imageSource = null;
    for(var i = 0; i < this.state.maxStars; i++) {
      if(i < this.state.rating) {
        imageSource = this.props.selectStar;
      }
      else {
        imageSource = this.props.unSelectStar;
      }

      var onLayoutFunc = null;
      if(i === 0) {
        onLayoutFunc = this.onLayoutChanged;
      }

      var styleArray = [];
      if(i !== this.state.maxStars - 1) {
        styleArray.push({ marginRight: this.props.interitemSpacing });
      }
      if(this.state.starSize > 0) {
        styleArray.push({width: this.state.starSize, height: this.state.starSize});
      }

      starArray.push(
        <StarView
          key={i}
          starNumber={i+1}
          source={imageSource}
          style={styleArray}
          onLayout={onLayoutFunc}
          onPress={this.onStarPressed}
        />
      );
    }
    return (
      <View style={styles.container}>
        {starArray}
      </View>
    )
  }

  onStarPressed(starNumber) {
    var rating = starNumber;
    if(rating < 0) {
      rating = 0;
    }
    else if(rating > this.state.maxStars) {
      rating = this.state.maxStars;
    }
    this.setState({
      rating: rating,
    });
    this.props.valueChanged(rating);
  }
  
  onLayoutChanged(layoutInfo) {
    console.log(layoutInfo.nativeEvent.layout);
    var starSize = layoutInfo.nativeEvent.layout.width;
    if(this.state.starSize > 0) {
      this.setState({
        containerLayout: layoutInfo.nativeEvent.layout,
      });s
    }
    else {
      this.setState({
        containerLayout: layoutInfo.nativeEvent.layout,
        starSize: starSize,
      });
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

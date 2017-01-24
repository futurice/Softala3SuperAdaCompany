import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import * as GameState from '../game/GameState';

const screenWidth = Dimensions.get('window').width;
const cellsNumber = 14;
const puzzleWidth = screenWidth - 10;
const cellSize = (puzzleWidth - 28) / cellsNumber;

class Cell extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const {
      cellX,
      cellY,
      status,
      text,
      onCellPress,
      gameStatus
    } = this.props;

    const style = styles[status];

    return (
      <TouchableOpacity
        style={[styles.column, style]}
        onPressOut={onCellPress(cellX, cellY)}
        >
        <Text style={styles.cellText}>
          {gameStatus === GameState.GAME_RUNNING ? text : ' ' }
        </Text>
      </TouchableOpacity>
    );
  }
}

const columnBase = {
  width: cellSize,
  height: cellSize,
  marginLeft: 1,
  alignItems: 'center',
  justifyContent: 'center'
};

const styles = StyleSheet.create({
  cellText: {
    color: 'black'
  },
  column: {
    ...columnBase,
    backgroundColor: 'powderblue'
  },
  pressed: {
    ...columnBase,
    backgroundColor: 'yellow'
  },
  discovered: {
    ...columnBase,
    backgroundColor: 'lightyellow'
  }
});

export default Cell;

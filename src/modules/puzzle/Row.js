import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Cell from './Cell';

const isCellIn = (list, {x, y}) => {
  const found = list.filter((elem) => {
    return elem.x === x && elem.y === y;
  });

  return found.length > 0;
};

class Row extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const {
        row,
        cellY,
        onCellPress,
        pressedCells,
        discoveredCells
    } = this.props;

    const cells = row.map((cell,cellX) => {
      let status = 'normal';
      if (isCellIn(pressedCells, {x: cellX, y: cellY})) {
        status = 'pressed';
      } else if (isCellIn(discoveredCells, {x: cellX, y: cellY})) {
        status = 'discovered';
      }

      return (
        <Cell
          key={cellX + cellY}
          status={status}
          text={cell}
          onCellPress={onCellPress}
          cellX={cellX}
          cellY={cellY}
          />
      );
    });

    return (
      <View style={styles.row} key={cellY}>
        {cells}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 1
  }
});

export default Row;

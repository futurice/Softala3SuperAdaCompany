import React, {PropTypes, Component} from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View
} from 'react-native';
import Row from './Row';

const screenWidth = Dimensions.get('window').width;
const puzzleWidth = screenWidth - 10;

const onCellPress = (component) => (cellX, cellY) => (event) => {
  event.preventDefault();

  const {
    puzzle,
    solution,
    discoveredSoFar,
    wordFound
  } = component.props;

  const {
    found
  } = solution;

  const {
    currentWord
  } = component.state;

  const wordHit = found.filter((foundWordObj) => {
    return (
      !discoveredSoFar.words.includes(foundWordObj.word) &&
      foundWordObj.x === cellX && foundWordObj.y === cellY
    );
  });

  if (wordHit.length > 0 || currentWord.wordHit !== null) {
    const {pressedCells} = component.state;
    pressedCells.push({x: cellX, y: cellY});

    // if we hit the beginning of a new word whilst following
    // a current one, ignore the new one
    currentWord.wordHit = currentWord.wordHit || wordHit[0];

    const {currentWordPressed} = currentWord;
    const {word} = currentWord.wordHit;

    const tmpWord = currentWordPressed.join('') + puzzle[cellY][cellX];
    if (tmpWord === word) {
      // Yeah, found a word!
      wordFound(currentWord.wordHit);

      component.setState({
        currentWord: {
          currentWordPressed: [],
          wordHit: null
        },
        pressedCells: []
      });

      return;
    }

    if (word.search(tmpWord) > -1) {
      // Got another letter of the word
      if (tmpWord.length > word.length / 2) {
        wordFound(currentWord.wordHit);

        component.setState({
          currentWord: {
            currentWordPressed: [],
            wordHit: null
          },
          pressedCells: []
        });

        return;
      }

      currentWordPressed.push(puzzle[cellY][cellX]);
      component.setState({
        currentWord: {
          currentWordPressed,
          wordHit: currentWord.wordHit
        },
        pressedCells
      });
    } else {
      // Letter doesn't belong to a word, reset pressedCells and currentWord
      component.setState({
        currentWord: {
          currentWordPressed: [],
          wordHit: null
        },
        pressedCells: []
      });

      return;
    }
  } else {
    // Letter doesn't belong to a word, reset pressedCells and currentWord
    component.setState({
      currentWord: {
        currentWordPressed: [],
        wordHit: null
      },
      pressedCells: []
    });
  }
};

class Puzzle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWord: {
        currentWordPressed: [],
        wordHit: null
      },
      pressedCells: []
    };
  }

  componentDidMount() {
    this.props.gameStarted();
  }

  componentWillUpdate(newProps) {
    const {
      gameCompleted,
      wordsToFind
    } = newProps;

    if (wordsToFind === 0) {
      setTimeout(() => {
        gameCompleted();
      }, 500);
    }
  }

  render() {
    const {
      puzzle,
      discoveredSoFar
    } = this.props;

    const {
      pressedCells
    } = this.state;

    const {
      cells
    } = discoveredSoFar;

    const rows = puzzle.map((row,idx) => {
      return (
        <Row
          key={idx}
          onCellPress={onCellPress(this)}
          pressedCells={pressedCells}
          discoveredCells={cells}
          cellY={idx}
          row={row}
          />
      );
    });

    return (
      <View style={styles.puzzle}>
        {rows}
      </View>
    );
  }
}

Puzzle.propTypes = {
  puzzle: PropTypes.array.isRequired,
  solution: PropTypes.object.isRequired,
  discoveredSoFar: PropTypes.object.isRequired,
  gameStarted: PropTypes.func.isRequired,
  wordsToFind: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  puzzle: {
    flex: 1,
    width: puzzleWidth,
    alignSelf: 'center',
    alignItems: 'center'
  }
});

export default Puzzle;

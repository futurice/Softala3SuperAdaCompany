import React, {PropTypes, Component} from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View
} from 'react-native';
import Row from './Row';
import wordfind from './wordfind';

const screenWidth = Dimensions.get('window').width;
const puzzleWidth = screenWidth - 10;

const getCellsFromWord = ({x, y, orientation, word}) => {
  const next = wordfind.orientations[orientation];

  const cells = word.split('').map((_, idx) => {
    return next(x,y,idx);
  });

  return cells;
};

const wordFound = (component, currentWord) => {
  const {solution} = component.props;
  const {discoveredSoFar} = component.state;
  const {word} = currentWord.wordHit;

  const cells = discoveredSoFar.cells.concat(getCellsFromWord(currentWord.wordHit));
  discoveredSoFar.words.push(word);
  discoveredSoFar.cells = cells;

  const {
    wordsToFind,
    gameCompleted
  } = component.props;
  const wordsStillToFind = solution.found.length - discoveredSoFar.words.length;
  wordsToFind(wordsStillToFind);

  if (wordsStillToFind === 0) {
    gameCompleted();
  }

  component.setState({
    currentWord: {
      currentWordPressed: [],
      wordHit: null
    },
    discoveredSoFar,
    pressedCells: []
  });
};

const onCellPress = (component) => (cellX, cellY) => (event) => {
  event.preventDefault();

  const {puzzle, solution} = component.props;
  const {found} = solution;
  const {currentWord, discoveredSoFar} = component.state;

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
      wordFound(component, currentWord);

      return;
    }

    if (word.search(tmpWord) > -1) {
      // Got another letter of the word
      if (tmpWord.length + 1 > word.length / 2) {
        wordFound(component, currentWord);

        return;
      }

      currentWordPressed.push(puzzle[cellY][cellX]);

      component.setState({
        currentWord: {
          currentWordPressed,
          wordHit: currentWord.wordHit
        },
        discoveredSoFar,
        pressedCells
      });
    } else {
      // Letter doesn't belong to a word, reset pressedCells and currentWord
      component.setState({
        currentWord: {
          currentWordPressed: [],
          wordHit: null
        },
        discoveredSoFar,
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
      discoveredSoFar: {
        words: [],
        cells: []
      },
      pressedCells: []
    };
  }

  componentDidMount() {
    this.props.gameStarted();
  }

  render() {
    const {
      puzzle
    } = this.props;

    const {
      pressedCells,
      discoveredSoFar
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
  solution: PropTypes.object.isRequired
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

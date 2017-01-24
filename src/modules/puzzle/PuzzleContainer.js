import {connect} from 'react-redux';
import * as GameState from '../game/GameState';
import Puzzle from './Puzzle';

export default connect(
  (state) => ({
    discoveredSoFar: state.gameState.discoveredSoFar,
    wordsToFind: state.gameState.wordsToFind
  }),
  dispatch => ({
    gameStarted() {
      dispatch(GameState.gameStarted(Date.now()));
    },
    gameCompleted() {
      dispatch(GameState.gameCompleted(Date.now()));
    },
    wordFound(word) {
      dispatch(GameState.wordFound(word));
    }
  })
)(Puzzle);

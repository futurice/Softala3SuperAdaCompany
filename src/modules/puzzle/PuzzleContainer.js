import {connect} from 'react-redux';
import * as GameState from '../game/GameState';
import Puzzle from './Puzzle';

export default connect(
  () => ({}),
  dispatch => ({
    gameStarted() {
      dispatch(GameState.gameStarted(Date.now()));
    },
    gameCompleted() {
      dispatch(GameState.gameCompleted(Date.now()));
    },
    wordsToFind(numberOfWordsLeftInPuzzle) {
      dispatch(GameState.wordsToFind(numberOfWordsLeftInPuzzle));
    }
  })
)(Puzzle);

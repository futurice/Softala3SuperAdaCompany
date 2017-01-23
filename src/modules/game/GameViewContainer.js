import {connect} from 'react-redux';
import * as GameState from './GameState';
import GameView from './GameView';

export default connect(
  state => ({
    gameState: state.gameState
  }),
  dispatch => ({
    initialiseGame() {
      dispatch(GameState.initGame());
    }
  })
)(GameView);

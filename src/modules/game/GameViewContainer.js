import {connect} from 'react-redux';
import GameView from './GameView';

export default connect(
  state => ({
    gameState: state.gameState
  }),
)(GameView);

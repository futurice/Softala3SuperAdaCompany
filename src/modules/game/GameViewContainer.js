import {connect} from 'react-redux';
import rest from '../../services/rest';
import * as GameState from './GameState';
import GameView from './GameView';

export default connect(
  state => ({
    gameState: state.gameState,
    quizStatus: state.quizStatus
  }),
  dispatch => ({
    initialiseGame() {
      dispatch(GameState.initGame());
    },
    setQuizPoints(points) {
      dispatch(rest.actions.setQuizPoints({}, {
        body: JSON.stringify({points: points})
      }, (err, data) => {
        if (!err) {
          console.log('successfully set quiz points: ', points);
        } else {
          console.log('Error setting quiz points: ', err, data);
        }
      }));
    },
    refresh() {
      dispatch(rest.actions.quizStatus());
    },
    deleteGame() {
      dispatch(rest.actions.deleteGame());
    }
  })
)(GameView);

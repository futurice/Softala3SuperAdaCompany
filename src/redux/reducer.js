//import {combineReducers} from 'redux-loop';
import {
  combineReducers
} from 'redux';
import NavigationStateReducer from '../modules/navigation/NavigationState';
import GameStateReducer from '../modules/game/GameState';
import SessionStateReducer, {RESET_STATE} from '../modules/session/SessionState';
import rest from '../services/rest';

const reducers = {
  // @NOTE: By convention, the navigation state must live in a subtree called
  //`navigationState`
  navigationState: NavigationStateReducer,

  session: SessionStateReducer,

  gameState: GameStateReducer,

  ...rest.reducers
};

const namespacedReducer = combineReducers(
  reducers
);

export default function mainReducer(state, action) {
  if (action.type === RESET_STATE) {
    return namespacedReducer(action.payload, action);
  }

  return namespacedReducer(state || void 0, action);
}

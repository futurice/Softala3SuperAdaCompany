import { combineReducers } from 'redux';
import NavigatorStateReducer from '../states/NavigatorState';
import SessionStateReducer, {RESET_STATE} from '../states/SessionState';
import rest from '../services/rest';

const reducers = {
  navigatorState: NavigatorStateReducer,

  session: SessionStateReducer,

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

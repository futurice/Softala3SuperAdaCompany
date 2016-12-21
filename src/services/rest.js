import reduxApi, { transformers } from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";
import { fromJS, toJS, Iterable } from 'immutable';

const apiRoot = __DEV__ ? 'http://localhost:3000' : 'http://superada.herokuapp.com';

// Endpoint configurations
const rest = reduxApi({
  auth: {
    url: `${apiRoot}/teams/authenticate`,
    options: {
      method: 'POST'
    }
  },
}).use("fetch", adapterFetch(fetch));

export default rest;

export const restReducer = (state = fromJS({}), action) => {
  // TODO: this has a pretty bad performance penalty
  state = state.toJS();

  Object.keys(rest.reducers).forEach((key) => {
    const oldState = state[key];
    const newState = rest.reducers[key](oldState, action);
    state[key] = newState;
  });

  return fromJS(state);
};

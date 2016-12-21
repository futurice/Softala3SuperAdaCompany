import reduxApi, { transformers } from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";

const apiRoot = __DEV__ ? 'http://localhost:3000' : 'http://superada.herokuapp.com';

// Endpoint configurations
const rest = reduxApi({
  auth: {
    url: `${apiRoot}/teams/authenticate`,
    options: {
      method: 'POST'
    }
  },
  teamDetails: {
    url: `${apiRoot}/teamDetails`,
    transformer: (data, prevData, action) => {
      console.log('prevData:', prevData);
      return {...prevData, ...data};
    },
    crud: true
  },
}).use('options', (url, params, getState) => {
  const token = getState().auth.data.token;

  // Add token to header request
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    return { headers: {  ...headers, Authorization: `Bearer ${token}` } };
  }

  return { headers };
}).use('fetch', adapterFetch(fetch));

// TODO: on unauthorized error, clear token

export default rest;
  /*
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
*/

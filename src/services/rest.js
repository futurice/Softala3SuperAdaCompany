import reduxApi, {transformers} from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

export const CLEAR_TEAMLIST_ERROR = 'rest/CLEAR_TEAMLIST_ERROR';
export const CLEAR_AUTH_ERROR = 'rest/CLEAR_AUTH_ERROR';
export const CLEAR_TEAMPOINTS_ERROR = 'rest/CLEAR_TEAMPOINTS_ERROR';

const apiRoot = __DEV__ ? 'http://localhost:3000' : 'https://superada.herokuapp.com';

// Endpoint configurations
const rest = reduxApi({
  auth: {
    url: `${apiRoot}/company/authenticate`,
    options: {
      method: 'POST'
    },
    reducer(state, action) {
      if(action.type === CLEAR_AUTH_ERROR) {
        return Object.assign({}, state, { error: null })
      }
      return state;
    }
  },
  teamList: {
    url: `${apiRoot}/company/teamlist`,
    transformer: transformers.array,
    crud: true,
    reducer(state, action) {
      if(action.type === CLEAR_TEAMLIST_ERROR) {
        return Object.assign({}, state, { error: null })
      }
      return state;
    }
  },
  teamPoints: {
    url: `${apiRoot}/company/companypoint/:teamId`,
    crud: true,
    postfetch: [
      ({ actions, dispatch }) => dispatch(actions.teamList())
    ],
    reducer(state, action) {
      if(action.type === CLEAR_TEAMPOINTS_ERROR) {
        return Object.assign({}, state, { error: null })
      }
      return state;
    }
  },
  // NOTE: when adding new API endpoints, remember to clear .loading property
  // in AppView.js resetSnapshot() function
}).use('options', (url, params, getState) => {
  const token = getState().auth.data.token;

  // Add token to header request
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  if (token) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      }
    };
  }

  return {
    headers
  };
}).use('fetch', adapterFetch(fetch));

// TODO: on unauthorized error, clear token

export default rest;
export const reducers = rest.reducers;

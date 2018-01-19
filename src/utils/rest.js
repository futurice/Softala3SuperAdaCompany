import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

export const CLEAR_AUTH_ERROR = 'rest/CLEAR_AUTH_ERROR';
export const CLEAR_TEAMLIST_ERROR = 'rest/CLEAR_TEAMLIST_ERROR';
export const CLEAR_TEAMPOINTS_ERROR = 'rest/CLEAR_TEAMPOINTS_ERROR';

export const apiRoot = __DEV__
  ? 'http://localhost:3000'
  : 'https://superada.herokuapp.com';

// Endpoint configurations
const rest = reduxApi({
  auth: {
    url: `${apiRoot}/company/authenticate`,
    options: {
      method: 'POST',
    },
    reducer(state, action) {
      if (action.type === CLEAR_AUTH_ERROR) {
        return Object.assign({}, state, { error: null });
      }
      return state;
    },
  },
  teamlist: {
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
  teampoints: {
    url: `${apiRoot}/company/companypoint/:teamId`,
    crud: true,
    postfetch: [
      ({ actions, dispatch }) => dispatch(actions.teamlist())
    ],
    reducer(state, action) {
      if(action.type === CLEAR_TEAMPOINTS_ERROR) {
        return Object.assign({}, state, { error: null })
      }
      return state;
    }
  },
})
  .use('options', (url, params, getState) => {
    const { auth: { data: { token } } } = getState();

    // Add token to header request
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // Add token to request headers
    if (token) {
      return { headers: { ...headers, Authorization: `Bearer ${token}` } };
    }

    return { headers };
  })
  .use('fetch', adapterFetch(fetch));

export default rest;
export const reducers = rest.reducers;

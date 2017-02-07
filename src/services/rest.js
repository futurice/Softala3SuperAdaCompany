import reduxApi, {transformers} from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

const apiRoot = __DEV__ ? 'http://localhost:3000' : 'https://superada.herokuapp.com';

// Endpoint configurations
const rest = reduxApi({
  auth: {
    url: `${apiRoot}/company/authenticate`,
    options: {
      method: 'POST'
    }
  },
  teamList: {
    url: `${apiRoot}/company/teamlist`,
    transformer: transformers.array,
    crud: true
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

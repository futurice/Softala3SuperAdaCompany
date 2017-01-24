import reduxApi, {transformers} from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

const apiRoot = __DEV__ ? 'http://localhost:3000' : 'https://superada.herokuapp.com';

// Endpoint configurations
const rest = reduxApi({
  auth: {
    url: `${apiRoot}/teams/authenticate`,
    options: {
      method: 'POST'
    }
  },
  teamDetails: {
    url: `${apiRoot}/teamdetails`,
    transformer: (data, prevData, action) => {
      return {...prevData, ...data};
    },
    crud: true
  },
  companyPoints: {
    url: `${apiRoot}/companypoints`
  },
  feedback: {
    url: `${apiRoot}/feedback`,
    transformer: transformers.array,
    crud: true
  },
  companies: {
    url: `${apiRoot}/companies`,
    transformer: transformers.array
  },
  quizStatus: {
    url: `${apiRoot}/quiz`,
    options: {
      method: 'GET'
    }
  },
  setQuizPoints: {
    url: `${apiRoot}/quiz`,
    options: {
      method: 'POST'
    }
  },
  deleteGame: {
    url: `${apiRoot}/quiz`,
    options: {
      method: 'DELETE'
    }
  }
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

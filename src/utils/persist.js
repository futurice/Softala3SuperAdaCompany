import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import { reducers as restReducers } from '../services/rest';

/**
 * Don't save or restore 'loading' flag in rest reducers.
 *
 * If the 'loading' flag is set even though there is no request in progress,
 * redux-api will wait forever and never let us issue any further requests
 * to the endpoint
 */
const apiLoadingFilters = Object.keys(restReducers).map(reducer =>
  createBlacklistFilter(reducer, ['loading', 'error'], ['loading', 'error']),
);

const persistConfig = {
  storage: AsyncStorage,
  transforms: [...apiLoadingFilters],
  blacklist: [
    // Don't restore navigation state
    'router',

    // Clear any errors from previous app state
    'err',
  ],
};

export default (store, callback) =>
  persistStore(store, persistConfig, callback);

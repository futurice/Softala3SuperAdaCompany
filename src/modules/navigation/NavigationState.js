import {NavigationExperimental} from 'react-native';

const {StateUtils: NavigationStateUtils} = NavigationExperimental;

// Actions
const PUSH_ROUTE = 'NavigationState/PUSH_ROUTE';
const POP_ROUTE = 'NavigationState/POP_ROUTE';
const SWITCH_TAB = 'NavigationState/SWITCH_TAB';

export function switchTab(key) {
  return {
    type: SWITCH_TAB,
    payload: key
  };
}

// Action creators
export function pushRoute(route) {
  return {
    type: PUSH_ROUTE,
    payload: route
  };
}

export function popRoute() {
  return {type: POP_ROUTE};
}

//var derp1 = 'testi';

//('../../images/pepperoni.png');
// reducers for tabs and scenes are separate
const initialState = {
  tabs: {
    index: 0,
    routes: [
      {key: 'HomeTab', title: 'HOME'},
      {key: 'ProfileTab', title: 'TIIMI'},
      {key: 'CheckPointsTab', title: 'RASTIT'},
      {key: 'LinkTab', title: 'LINKIT'}
    ]
  },

  // Scenes for the `HomeTab` tab.
  HomeTab: {
    index: 0,
    routes: [{key: 'Welcome', title: 'Etusivu'}]
  },

  // Scenes for the `ProfileTab` tab.
  ProfileTab: {
    index: 0,
    routes: [{key: 'TeamView', title: 'Joukkue'}]
  },
  CheckPointsTab: {
    index: 0,
    routes: [{key: 'CheckPoints', title: 'Rastit'}]
  },
  LinkTab: {
    index: 0,
    routes: [{key: 'Counter', title: 'Linkit'}]
  }
};

export default function NavigationReducer(state = initialState, action) {
  switch (action.type) {
    case PUSH_ROUTE: {
      // Push a route into the scenes stack.
      const route = action.payload;
      const tabs = state.tabs;
      const tabKey = tabs.routes[tabs.index].key;
      const scenes = state[tabKey];
      let nextScenes;
      // fixes issue #52
      // the try/catch block prevents throwing an error when the route's key pushed
      // was already present. This happens when the same route is pushed more than once.
      try {
        nextScenes = NavigationStateUtils.push(scenes, route);
      } catch (e) {
        nextScenes = scenes;
      }
      if (scenes !== nextScenes) {
        return {
          ...state,
          [tabKey]: nextScenes
        };
      }
      return state;
    }

    case POP_ROUTE: {
      // Pops a route from the scenes stack.
      const tabs = state.tabs;
      const tabKey = tabs.routes[tabs.index].key;
      const scenes = state[tabKey];
      const nextScenes = NavigationStateUtils.pop(scenes);
      if (scenes !== nextScenes) {
        return {
          ...state,
          [tabKey]: nextScenes
        };
      }
      return state;
    }

    case SWITCH_TAB: {
      // Switches the tab.
      const tabs = NavigationStateUtils.jumpTo(state.tabs, action.payload);
      if (tabs !== state.tabs) {
        return {
          ...state,
          tabs
        };
      }
      return state;
    }

    default:
      return state;
  }
}

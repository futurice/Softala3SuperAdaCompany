/*eslint-disable react/prop-types*/

import React from 'react';
import LoginViewContainer from './login/LoginViewContainer';
import TeamPointsViewContainer from './teamPoints/TeamPointsViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const key = props.scene.route.key;

  if (key === 'LoginView') {
    return <LoginViewContainer />;
  }

  if (key === 'TeamPointsTab') {
    return <TeamPointsViewContainer />;
  }

  throw new Error('Unknown navigation key: ' + key);
}

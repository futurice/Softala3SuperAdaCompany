import { StackNavigator } from 'react-navigation';

import LoginView from '../views/LoginView';
import TeamPointsView from '../views/TeamPointsView';

const AppNavigator = StackNavigator({
  Login: { screen: LoginView },
  MainScreen: { screen: TeamPointsView },
});

export default AppNavigator;

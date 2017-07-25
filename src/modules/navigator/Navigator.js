import { StackNavigator } from 'react-navigation';

import LoginView from '../login/LoginView';
import TeamPointsView from '../teamPoints/TeamPointsViewContainer';

const AppNavigator = StackNavigator({
  Login: { screen: LoginView },
  MainScreen: { screen: TeamPointsView },
});

export default AppNavigator;

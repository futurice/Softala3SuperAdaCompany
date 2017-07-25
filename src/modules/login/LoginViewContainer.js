import {connect} from 'react-redux';
import LoginView from './LoginView';
import {setAuthenticationToken} from '../../utils/authentication';
import * as NavigatorState from '../../states/NavigatorState';
import rest from '../../services/rest';
import { NavigationActions } from 'react-navigation';

export default connect(
  state => ({
    auth: state.auth,
    token: state.auth.data.token
  }),
  dispatch => ({
    login(name) {
      dispatch(rest.actions.auth({}, {
        body: JSON.stringify({
          name: name.trim()
        })
      }, (err, data) => {
        if (!err) {
          setAuthenticationToken(data.token);
        }
      }),);
    },
    navigateTo: (routeName: string) =>
      dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName})]
        })
      )
  })
)(LoginView);

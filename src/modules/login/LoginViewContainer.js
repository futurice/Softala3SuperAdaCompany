import {connect} from 'react-redux';
import LoginView from './LoginView';
import {setAuthenticationToken} from '../../utils/authentication'
import * as NavigationState from '../../modules/navigation/NavigationState';
import rest from '../../services/rest';

export default connect(
  state => ({
    auth: state.getIn(['rest', 'auth']).toJS()
  }),
  dispatch => ({
    login(name) {
      dispatch(rest.actions.auth({}, {
        body: JSON.stringify({
          name
        })
      }, (err, data) => {
        if (!err) {
          setAuthenticationToken(data.token.token);
          //this.props.dispatch(NavigationState.switchTab('HomeTab'));
        }
      }));
    }
  })
)(LoginView);

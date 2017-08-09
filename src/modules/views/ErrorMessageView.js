import React from 'react';
import { connect } from 'react-redux';
import { MessageBar, MessageBarManager} from 'react-native-message-bar';
import { CLEAR_AUTH_ERROR, CLEAR_TEAMLIST_ERROR, CLEAR_TEAMPOINTS_ERROR } from '../../services/rest';

class ErrorMessageView extends React.Component {
  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.authError) {
      MessageBarManager.showAlert({
        alertType: 'error',
        title: 'Error happened',
        message: 'Could not authenticate: ' +nextProps.authError.message
      })
      this.props.clearAuthError();
    }
    if(nextProps.teamListError) {
      MessageBarManager.showAlert({
        alertType: 'error',
        title: 'Error happened',
        message: 'Error with team list request: ' +nextProps.teamListError.message
      })
      this.props.clearTeamListError();
    }
    if(nextProps.teamPointsError) {
      MessageBarManager.showAlert({
        alertType: 'error',
        title: 'Error happened',
        message: 'Error with team points request: ' +nextProps.teamPointsError.message
      })
      this.props.clearTeamPointsError();
    }
  }

  render() {
    return (
      <MessageBar ref={ (alert) => { 
          MessageBarManager.registerMessageBar(alert); }} /> 
    )
  }  
}

export default connect(
  state => ({
    authError: state.auth.error,
    teamListError: state.teamList.error,
    teamPointsError: state.teamPoints.error
  }),
  dispatch => ({
    clearAuthError(){
      dispatch({type: CLEAR_AUTH_ERROR});
    },
    clearTeamListError() {
      dispatch({type: CLEAR_TEAMLIST_ERROR});
    },
    clearTeamPointsError(){
      dispatch({type: CLEAR_TEAMPOINTS_ERROR});
    }
  })
)(ErrorMessageView)
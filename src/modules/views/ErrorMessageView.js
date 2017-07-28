import React from 'react';
import { connect } from 'react-redux';
import { MessageBar, MessageBarManager} from 'react-native-message-bar';

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
    }
    if(nextProps.teamListError) {
      MessageBarManager.showAlert({
        alertType: 'error',
        title: 'Error happened',
        message: 'Could not fetch team list: ' +nextProps.teamListError.message
      })
    }
    if(nextProps.teamPointsError) {
      MessageBarManager.showAlert({
        alertType: 'error',
        title: 'Error happened',
        message: 'Could update the team points: ' +nextProps.teamPointsError.message
      })
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
  })
)(ErrorMessageView)
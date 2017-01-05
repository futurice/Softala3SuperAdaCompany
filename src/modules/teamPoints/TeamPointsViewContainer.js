import {connect} from 'react-redux';
import TeamPointsView from './TeamPointsView';
import rest from '../../services/rest';
import * as NavigationState from '../../modules/navigation/NavigationState';

export default connect(
  state => ({
    companyPoints: state.companyPoints
  }),
  dispatch => ({
    refresh() {
      dispatch(rest.actions.companyPoints());
    },
    feedback() {
      dispatch(NavigationState.pushRoute({
        key: 'FeedbackView',
        title: 'Anna palautetta'
      }));
    },
    goodbye() {
      dispatch(NavigationState.pushRoute({
        key: 'Goodbye',
        title: 'Kiitos osallistumisesta!'
      }));
    }
  })
)(TeamPointsView);

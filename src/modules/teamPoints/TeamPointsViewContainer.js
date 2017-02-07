import { connect } from 'react-redux';
import TeamPointsView from './TeamPointsView';
import rest from '../../services/rest';

export default connect(
  state => ({
    teamPoints: state.teamPoints
  }),
  dispatch => ({
    refresh() {
      dispatch(rest.actions.teamPoints());
    }
  })
)(TeamPointsView);

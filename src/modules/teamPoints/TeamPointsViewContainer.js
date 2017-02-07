import { connect } from 'react-redux';
import TeamPointsView from './TeamPointsView';
import rest from '../../services/rest';

export default connect(
  state => ({
    teamList: state.teamList
  }),
  dispatch => ({
    refresh() {
      dispatch(rest.actions.teamList());
    },
    savePoints(teamId, points) {
      dispatch(rest.actions.teamPoints.post({ teamId }, {
        body: JSON.stringify({ points })
      }));
    },
    clearPoints(teamId) {
      dispatch(rest.actions.teamPoints.delete({ teamId }));
    },
  })
)(TeamPointsView);

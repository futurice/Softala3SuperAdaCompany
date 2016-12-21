import {connect} from 'react-redux';
import TeamView from './TeamView';

import {setAuthenticationToken} from '../../utils/authentication'
import * as NavigationState from '../../modules/navigation/NavigationState';
import rest from '../../services/rest';

export default connect(
  state => ({
    teamDetails: state.teamDetails,
    image: state.teamDetails.data.file
  }),
  dispatch => ({
    refresh() {
      dispatch(rest.actions.teamDetails());
    },
    save(description, image) {
      dispatch(rest.actions.teamDetails.post({}, {
        body: JSON.stringify({ description, image })
      }));
    }
  })
)(TeamView);

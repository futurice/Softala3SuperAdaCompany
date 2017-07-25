import React, {PropTypes, Component} from 'react';
import {addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';

import AppNavigator from './Navigator';

const mapStateToProps = state => ({
  navigationState: state.navigationState
});

export class NavigatorView extends Component {
  static displayName = 'NavigationView';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigationState: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          routeName: PropTypes.string.isRequired
        }),
      )
    }).isRequired
  };

  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigationState
        })}
      />
    );
  }
}

export default connect(mapStateToProps)(NavigatorView);

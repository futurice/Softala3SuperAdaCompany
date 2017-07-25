import React, {PropTypes, Component} from 'react';
import {addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';

import AppNavigator from './Navigator';

const mapStateToProps = state => ({
  navigatorState: state.navigatorState
});

export class NavigatorView extends Component {
  static displayName = 'NavigatorView';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigatorState: PropTypes.shape({
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
          state: this.props.navigatorState
        })}
      />
    );
  }
}

export default connect(mapStateToProps)(NavigatorView);

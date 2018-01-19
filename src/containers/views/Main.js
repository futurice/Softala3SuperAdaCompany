import React, { Component } from 'react';
import {
  Alert,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  WebView,
  ListView,
  ScrollView,
} from 'react-native';

import styled from 'styled-components/native';
import { texts } from '../../utils/translation';

const TeamContainer = styled.View`
  background-color: ${() => AppStyles.darkRed};
  border-radius: 5px;
  padding: 10px;
  margin-horizontal: 10px;
  margin-top: 10px;
  flex-direction: row;
`;

const TeamRightContainer = styled.View`
  flex: 1;
  flex-direction: column;
  ${'' /* align-items: center; */};
`;

const TeamTitle = styled.Text`
  color: ${() => AppStyles.white};
  font-family: pt-sans;
  font-size: 30;
`;
const TeamPointsContainer = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-around;
`;
const Point = styled.Image`
  width: 35px;
  height: 35px;
`;

const TeamProfilePic = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

// Header
const HeaderContainer = styled.View`
  flex-direction: row;
  padding: 10px;
  background-color: white;
`;

const CompanyLogo = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const SearchBar = styled.TextInput`
  height: 48px;
  margin-horizontal: 10px;
  padding-horizontal: 10px;
  background-color: #eeeeee;
  flex: 1;
`;

import { NavigationActions } from 'react-navigation';
import AppStyles from '../../AppStyles';
import { apiRoot } from '../../utils/rest';
import I18n from 'ex-react-native-i18n';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
import Star from '../../../assets/star.png';
import StarGrey from '../../../assets/star_grey.png';
import Clear from '../../../assets/x_white.png';

const mapStateToProps = state => ({
  auth: state.auth.data,
  teams: state.teamlist.data,
});
const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(rest.actions.teamlist()),
  setPoints: (teamId, points) => {
    if (!points) {
      dispatch(rest.actions.teampoints.delete({ teamId }));
    } else {
      dispatch(
        rest.actions.teampoints.post(
          { teamId },
          { body: JSON.stringify({ points }) },
        ),
      );
    }
  },
  logout: () => {
    dispatch(
      rest.actions.auth.reset()
    );
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
      }),
    );
  }
});

export class MainView extends React.Component {
  static navigationOptions = {
    title: 'Super-Ada Teams',
  };

  state = {
    filter: '',
  };

  componentDidMount() {
    this.props.refresh();
  }

  setPointsConfirmation = (team, points) => () => {
    Alert.alert(
      I18n.t(points === 0 ? texts.teamPointsYouAreRemoving : texts.teamPointsYouAreAdding, { starNumber: points, teamName: team.teamName }),
      I18n.t(points === 0 ? texts.teamPointsConfirmRemoving : texts.teamPointsConfirmAdd),
      [
        {text: I18n.t(texts.cancel), style: 'cancel'},
        {text: I18n.t(texts.ok), onPress: () => this.props.setPoints(team.teamId, points)},
      ],
      { cancelable: true }
    );
  };

  onChangeFilter = filter => {
    filter = filter.trim();
    this.setState({ filter });
  };

  logoutConfirmation = () => {
    Alert.alert(
      I18n.t(texts.logoutTitle),
      I18n.t(texts.logoutConfirmation),
      [
        {text: I18n.t(texts.cancel), style: 'cancel'},
        {text: I18n.t(texts.ok), onPress: this.props.logout},
      ],
      { cancelable: true }
    )
  }

  renderHeader = () => (
    <HeaderContainer>
      <TouchableOpacity onPress={this.logoutConfirmation}>
        <CompanyLogo
          source={{
            uri: `${apiRoot}/public/company${this.props.auth.companyId}.png`,
          }}
        />
      </TouchableOpacity>
      <SearchBar
        value={this.state.filter}
        placeholder={I18n.t(texts.teamPointsSearchTeam)}
        onChangeText={this.onChangeFilter}
      />
    </HeaderContainer>
  );

  renderTeamPoints = team =>
    [...Array(5).keys()].map(i => (
      <TouchableOpacity key={i} onPress={this.setPointsConfirmation(team, i + 1)}>
        <Point source={i < team.points ? Star : StarGrey} />
      </TouchableOpacity>
    ));

  renderClearButton = team => (
    <TouchableOpacity onPress={this.setPointsConfirmation(team, 0)}>
      <Point source={Clear} />
    </TouchableOpacity>
  );

  getFilteredTeams = () =>
    this.props.teams

      // Sort teams alphabetically
      .sort((a, b) => (a.teamName < b.teamName ? -1 : 1))

      // Filter according to filter text (case insensitive)
      .filter(team =>
        team.teamName.toLowerCase().includes(this.state.filter.toLowerCase()),
      );

  renderTeams = () =>
    this.getFilteredTeams().map(team => (
      <TeamContainer key={team.teamId}>
        <TeamProfilePic
          source={{ uri: `${apiRoot}/public/team${team.teamId}.png` }}
        />
        <TeamRightContainer>
          <TeamTitle>{team.teamName}</TeamTitle>
          <TeamPointsContainer>
            {this.renderTeamPoints(team)}
            {this.renderClearButton(team)}
          </TeamPointsContainer>
        </TeamRightContainer>
      </TeamContainer>
    ));

  render = () => (
    <View>
      {this.renderHeader()}
      <ScrollView>{this.renderTeams()}</ScrollView>
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

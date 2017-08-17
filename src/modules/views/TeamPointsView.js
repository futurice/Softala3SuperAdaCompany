import React, { PropTypes } from 'react';
import {
  Text,
  Alert,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ListView,
  RefreshControl,
} from 'react-native';

import StarRatingView from './StarRatingView';

import AppStyles from '../AppStyles';

import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

import { connect } from 'react-redux';
import rest from '../../services/rest';

import TranslatedText from '../../components/TranslatedText';
import { getTranslated, texts } from '../../utils/translation';

const radio_props = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

const apiRoot = __DEV__
  ? 'http://localhost:3000'
  : 'https://superada.herokuapp.com';

class TeamPointsView extends React.Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      searchString: '',
      data: [],
      dataSource: ds.cloneWithRows([]),
      refreshing: false,
    };
  }

  filterTeams(data, searchString, resetPosition) {
    const filtered = data.filter(team =>
      team.teamName.toLowerCase().includes(searchString.toLowerCase()),
    );

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filtered),
    });

    if (resetPosition) {
      this.ListView && this.ListView.scrollTo({ x: 0, y: 0, animated: true });
    }
  }

  updateList(data) {
    this.setState({
      data,
      refreshing: false,
    });
    this.filterTeams(data, this.state.searchString);
  }

  componentWillReceiveProps(nextProps) {
    this.updateList(nextProps.teamList.data);
  }

  confirmSavePoints(teamId, points, name, savePoints) {
    savePoints(teamId, points);
  }

  confirmClearPoints(teamId, name, clearPoints) {
    Alert.alert(
      getTranslated(texts.teamPointsYouAreRemoving) + name,
      getTranslated(texts.teamPointsConfirmRemoving),
      [{ text: getTranslated(texts.ok), onPress: () => clearPoints(teamId) }, { text: getTranslated(texts.cancel)}],
    );
  }

  componentDidMount() {
    this.props.refresh();

    // Refresh with 1 min intervals
    this.setInterval(() => {
      this.props.refresh();
    }, 60 * 1000);
  }

  renderTeamRow(team, clearPoints, savePoints) {
    const fallbackSource = require('../../../images/defImg.png');
    const imgSource = { uri: `${apiRoot}/public/team${team.teamId}.png` };

    const { confirmSavePoints, confirmClearPoints } = this;

    return (
      <View style={styles.teamRow}>
        <Image
          style={styles.thumb}
          source={imgSource}
          defaultSource={fallbackSource}
        />
        <View style={styles.teamContent}>
          <View style={styles.teamText}>
            <Text numberOfLines={2} style={styles.teamName}>
              {team.teamName}
            </Text>
          </View>
          <View style={styles.allButtons}>
            <View>
              <StarRatingView
                maxStars={5}
                rating={team.points}
                teamName={team.teamName}
                selectStar={require('../../../images/star3.png')}
                unSelectStar={require('../../../images/star2.png')}
                valueChanged={value => {
                  confirmSavePoints(
                    team.teamId,
                    value,
                    team.teamName,
                    savePoints,
                  );
                }}
                starSize={35}
                interitemSpacing={1}
              />
            </View>
            <TouchableOpacity
              onPress={value => {
                confirmClearPoints(team.teamId, team.teamName, clearPoints);
              }}
              style={styles.clearPoints}
            >
              <Image
                style={styles.numButton}
                source={require('../../../images/buttonImages/x_white.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  onPullRefresh() {
    this.props.refresh();
    this.setState({ refreshing: true });
  }

  render() {
    const { dataSource } = this.state;

    const { clearPoints, savePoints, company } = this.props;

    const fallbackSource = require('../../../images/defCompanyImg.png');
    const imgSource = {
      uri: `${apiRoot}/public/company${company.companyId}.png`,
    };

    return (
      <View style={styles.teamContainer}>
        <View style={styles.headerStyle}>
          <TranslatedText style={styles.titleStyle} text={texts.teamPointsTeams}/>
        </View>
        <View style={styles.search}>
          <Image
            style={styles.companyImage}
            source={imgSource}
            defaultSource={fallbackSource}
          />
          <TextInput
            style={styles.searchBar}
            onChangeText={searchString => {
              searchString = searchString.trim();
              this.setState({ searchString });
              this.filterTeams(this.state.data, searchString, true);
            }}
            value={this.state.searchString}
            placeholder={getTranslated(texts.teamPointsSearchTeam)}
          />
        </View>
        <ListView
          enableEmptySections={true}
          keyboardShouldPersistTaps={true}
          dataSource={dataSource}
          ref={component => (this.ListView = component)}
          renderRow={team => {
            return this.renderTeamRow(team, clearPoints, savePoints);
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onPullRefresh.bind(this)}
            />
          }
        />
      </View>
    );
  }
}

reactMixin(TeamPointsView.prototype, TimerMixin);

const styles = StyleSheet.create({
  teamContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FAFAFA',
  },
  headerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF0036',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    color: '#000',
    padding: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 110,
    backgroundColor: '#ed3a4b',
    marginBottom: 10,
    borderRadius: 10,
  },
  teamContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  allButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  teamText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyImage: {
    height: 48,
    width: 48,
    borderWidth: 0,
    borderRadius: 24,
  },
  thumb: {
    height: 70,
    width: 70,
    borderWidth: 0,
    borderRadius: 35,
    margin: 20,
  },
  teamName: {
    fontSize: 20,
    color: '#FFF',
  },
  pointInput: {
    height: 30,
    width: 30,
    borderColor: 'black',
    borderWidth: 3,
    marginTop: 10,
  },
  numButton: {
    height: 25,
    width: 25,
    marginTop: 5,
  },
  star: {
    height: 29,
    width: 29,
  },
  clearPoints: {
    marginLeft: 10,
  },
});

export default connect(
  state => ({
    teamList: state.teamList,
    company: state.auth.data,
  }),
  dispatch => ({
    refresh() {
      dispatch(rest.actions.teamList());
    },
    savePoints(teamId, points) {
      dispatch(
        rest.actions.teamPoints.post(
          { teamId },
          {
            body: JSON.stringify({ points }),
          },
        ),
      );
    },
    clearPoints(teamId) {
      dispatch(rest.actions.teamPoints.delete({ teamId }));
    },
  }),
)(TeamPointsView);

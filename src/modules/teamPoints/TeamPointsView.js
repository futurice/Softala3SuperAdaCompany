import React, {PropTypes} from 'react';
import {
  Text,
  Alert,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ListView,
} from 'react-native';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

import AppStyles from '../AppStyles';

import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

const radio_props = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

const apiRoot = __DEV__ ? 'http://localhost:3000' : 'https://superada.herokuapp.com';

class TeamPointsView extends React.Component {
  constructor() {
    super();

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      searchString: '',
      data: [],
      dataSource: ds.cloneWithRows([])
    };
  }

  filterTeams(data, searchString) {
    const filtered = data.filter(
      (team) => team.teamName.toLowerCase().includes(searchString.toLowerCase())
    );

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filtered)
    });
  }

  updateList(data) {
    this.setState({
      data
    });

    this.filterTeams(data, this.state.searchString);
  }

  componentWillReceiveProps(nextProps) {
    this.updateList(nextProps.teamList.data);
  }

  confirmSavePoints(teamId, points, name, savePoints) {
      Alert.alert(
        'Olet antamassa ' + points + ' pistettä tiimille ' + name,
        'Vahvista pisteet painamalla OK',
        [
          { text: 'OK', onPress: () => savePoints(teamId, points) },
          { text: 'Peruuta' }
        ]
      )
  }

  confirmClearPoints(teamId, name, clearPoints) {
    Alert.alert(
      'Olet poistamassa antamasi pisteet tiimiltä: ' + name,
      'Vahvista pisteiden poisto painamalla OK',
      [
        { text: 'OK', onPress: () => clearPoints(teamId) },
        { text: 'Peruuta' }
      ]
    )
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
    const imgSource = { uri: `${apiRoot}/public/team${team.teamId}.png` }

    const { confirmSavePoints, confirmClearPoints } = this;

    return (
      <View style={styles.teamRow}>
        <Image style={styles.thumb} source={fallbackSource}>
          <Image style={styles.nestedThumb} source={imgSource} />
        </Image>
        <View style={styles.teamContent}>
          <View style={styles.teamText}>
            <Text style={styles.teamName}>{team.teamName}</Text>
          </View>
          <View style={styles.allButtons}>
            <View>
            <RadioForm
              formHorizontal={true}
              >
              {radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={false} key={i} >
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={team.points - 1 === i}
                  onPress={(value) => { confirmSavePoints(team.teamId, value, team.teamName, savePoints)}}
                  borderWidth={1}
                  buttonInnerColor={'#FFF'}
                  buttonOuterColor={'#FFF'}
                  buttonStyle={styles.radioButton}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={false}
                  onPress={(value) => { confirmSavePoints(team.teamId, value, team.teamName, savePoints)}}
                  labelStyle={{fontSize: 16, color: '#FFF'}}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
              </RadioForm>
              </View>
              <TouchableOpacity
                onPress={(value) => { confirmClearPoints(team.teamId, team.teamName, clearPoints) }}
                style={ styles.clearPoints } >
                <Image
                  style={styles.numButton}
                  source={require('../../../images/buttonImages/x_white.png')}
                />
              </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { dataSource } = this.state;

    const { clearPoints, savePoints, company } = this.props;

    const fallbackSource = require('../../../images/defCompanyImg.png');
    const imgSource = { uri: `${apiRoot}/public/company${company.companyId}.png` }

    return (
      <View style={styles.teamContainer}>
        <View style={styles.headerStyle}>
          <Text style={styles.titleStyle}>
            Super-Ada joukkueet
          </Text>
        </View>
        <View style={styles.search}>
          <Image style={styles.companyImage} source={fallbackSource}>
            <Image style={styles.nestedCompanyImage} source={imgSource} />
          </Image>
          <TextInput
            style={styles.searchBar}
            onChangeText={(searchString) => {
              searchString = searchString.trim();
              this.setState({ searchString });
              this.filterTeams(this.state.data, searchString);
            }}
            value={this.state.searchString}
            placeholder='Etsi joukkueen nimellä...'
            />
        </View>
        <ListView
          enableEmptySections={true}
          keyboardShouldPersistTaps={true}
          dataSource={dataSource}
          renderRow={(team) => { return this.renderTeamRow(team, clearPoints, savePoints)}}
        />
      </View>
    );
  }
};

reactMixin(TeamPointsView.prototype, TimerMixin);

const styles = StyleSheet.create({
  teamContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#FAFAFA"
  },
  headerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: '#FAFAFA'
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#FF0036',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  searchBar: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    color: '#000',
    padding: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 5
  },
  teamRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 110,
    backgroundColor: '#ed3a4b',
    marginBottom: 10,
    borderRadius: 10,
  },
  teamContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  allButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  teamText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  companyImage: {
    height: 48,
    width: 48,
    borderWidth: 0,
    borderRadius: 24,
  },
  nestedCompanyImage: {
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
  nestedThumb: {
    height: 70,
    width: 70,
    borderWidth: 0,
    borderRadius: 35,
  },
  teamName: {
    fontSize: 20,
    color: '#FFF'
  },
  pointInput: {
    height: 30,
    width: 30,
    borderColor: "black",
    borderWidth: 3,
    marginTop: 10,
  },
  numButton: {
    height: 25,
    width: 25,
    marginTop: 5
  },
  star: {
    height: 29,
    width: 29,
  },
  clearPoints: {
    marginLeft: 10
  }
});
export default TeamPointsView;

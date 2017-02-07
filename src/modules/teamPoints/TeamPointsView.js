import React, {PropTypes} from 'react';
import {
  Text,
  Alert,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableHighlight,
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
      dataSource: ds.cloneWithRows([])
    };
  }

  updateList(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    });
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
              <TouchableHighlight
                onPress={(value) => { confirmClearPoints(team.teamId, team.teamName, clearPoints) }}
                style={ styles.clearPoints } >
                <Image
                  style={styles.numButton}
                  source={require('../../../images/buttonImages/x_white.png')}
                />
              </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { dataSource } = this.state;

    const { clearPoints, savePoints } = this.props;

    return (
      <View style={styles.teamContainer}>
        <View style={styles.headerStyle}>
          <Text style={styles.titleStyle}>
            Super-Ada joukkueet
          </Text>
        </View>
        <View style={styles.search}>
          <TextInput
            style={styles.searchBar}
            onChangeText={(searchString) => {
              this.setState({searchString});
              this.filterTeams(searchString.trim());
            }}
            value={this.state.searchString}
            placeholder='Search...'
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



const styles = StyleSheet.create({
  teamContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#FAFAFA"
  },
  headerStyle: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: '#FAFAFA'
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#FF0036',
    marginTop: 10,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  searchBar: {
    width: 300,
    height: 50,
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
    backgroundColor: '#FF0036',
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

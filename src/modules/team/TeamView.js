import React, {PropTypes} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {options} from './image-picker-options';
import {post, get} from '../../utils/api';

const TeamView = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      teamDescription: '',
      avatarSource: null,
      teamName: ' ',
      imageChanged: false,
      loading: true,
      disableSave: false
    };
  },

  async componentDidMount() {
    await this.getTeamDetails();
    this.setState({ loading: false });
  },

  async saveTeamDetails() {
    this.setState({ disableSave: true });
    try {
      await this.saveSlogan();

      if (this.state.imageChanged) {
        await this.savePicture();
      }
      this.setState({ disableSave: false });
    } catch (e) {
      console.log(e);
      this.setState({ disableSave: false });
    }
  },

  async saveSlogan() {
    const response = await post('/saveDescription', {
      teamDescription: this.state.teamDescription
    });
  },

  async savePicture() {
    await post('/savePicture', this.state.avatarData);
    this.setState({ imageChanged: false });
  },

  async getTeamDetails() {
    // get name, picture and slogan from db

    const response = await get('/teamDetails');

    this.setState({
      teamName: response.teamName,
      teamDescription: response.description
    });

    var teamPicture = response.file;
    if (teamPicture !== null) {
      this.setState({
        avatarSource: {
          uri: 'data:image/png;base64,' + teamPicture
        }
      });
    }
  },

  openImageGallery() {
    this.setState({ disableSave: true });
    ImagePicker.showImagePicker(options, (response) => {
      this.setState({ disableSave: false });

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = {
          uri: 'data:image/png;base64,' + response.data,
          isStatic: true
        };

        this.setState({
          avatarSource: source, //source,
          avatarData: response.data,
          imageChanged: true
        });
      }
    });
  },

  render() {
    return (
      <ScrollView contentContainerStyle={styles.teamContainer}>
        <View style={styles.teamName}>
          <Text style={styles.teamTitle}> {this.state.teamName} </Text>
        </View>
        { this.state.loading
          ? <ActivityIndicator animating={true} style={{height: 150}} size="large" />
          : <TouchableOpacity
              onPress={this.openImageGallery}
              style={[styles.cameraButton]}>
              { this.state.avatarSource
                ? <Image source={this.state.avatarSource} style={styles.teamImage} />
                : <Image style={styles.cameraImage} source={require('../../../images/kamera.png')}/>
              }
            </TouchableOpacity>
        }
        <Text style={styles.descriptionText}>Slogan:</Text>
          <View style={styles.description}>
            <TextInput
              style={styles.teamInput}
              onChangeText={(teamDescription) => this.setState({teamDescription})}
              value={this.state.teamDescription}
              onSubmitEditing={() => {!this.state.loading && !this.state.disableSave && this.saveTeamDetails()}}
              />
          </View>
        <View style={styles.submitButton}>
          { this.state.loading || this.state.disableSave
            ? <ActivityIndicator animating={true} style={{height: 150}} size="large" />
            : <TouchableOpacity disabled={this.state.loading || this.state.disableSave} onPress={this.saveTeamDetails} accessible={true} style={styles.saveButton}>
                <Text style={[styles.whiteFont, {fontWeight: 'bold'}]}>{'TALLENNA'}</Text>
              </TouchableOpacity>
          }
        </View>
      </ScrollView>
    );
  }
});

const circle = {
  borderWidth: 0,
  borderRadius: 75,
  width: 150,
  height: 150
};

const styles = StyleSheet.create({
  teamContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
  teamName: {
    marginTop: 100
  },
  teamNameStyle: {
    alignItems: 'center',
  },
  teamTitle: {
    color: '#FF0036',
    fontSize: 30,
    fontWeight: 'bold'
  },
  description: {
    margin: 20
  },
  descriptionText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  teamInput: {
    width: 300,
    marginBottom: 30,
    color: 'black',
    ...Platform.select({
      ios: {
        height: 70,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 20
      }
    })
  },
  cameraButton: {
    ...circle,
    backgroundColor: '#EEEEEE',
    margin: 20
  },
  cameraImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    margin: 25
  },
  teamImage: {
    width: 150,
    height: 150,
    position: 'absolute',
    alignItems: 'center',
    borderRadius: 75
  },
  submitButton: {
    backgroundColor: '#ff5454',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 70,
    marginBottom: 100,
    marginTop: 20
  },
  whiteFont: {
    color: '#FFF',
    fontSize: 18
  }
});
export default TeamView;

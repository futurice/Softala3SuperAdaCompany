import React, {PropTypes} from 'react';
import {
Text,
View,
StyleSheet,
TouchableOpacity,
Image
} from 'react-native';
import GridView from 'react-native-grid-view';
import * as NavigationState from '../../modules/navigation/NavigationState';
import TeamPointsView from '../../modules/teamPoints/TeamPointsViewContainer';
import AppStyles from '../AppStyles';

const images = {
  Koulu: require('../../../images/companyImages/Koulu.png'),
  Futurice: require('../../../images/companyImages/Futurice.png'),
  Oracle: require('../../../images/companyImages/Oracle.png'),
  Reaktor: require('../../../images/companyImages/Reaktor.png'),
  Rovio: require('../../../images/companyImages/Rovio.png'),
  Sigmatic: require('../../../images/companyImages/Sigmatic.png'),
  Supercell: require('../../../images/companyImages/Supercell.png'),
  Appelsiini: require('../../../images/companyImages/Appelsiini.png'),
  Zalando: require('../../../images/companyImages/Zalando.png'),
  Koulu_visited: require('../../../images/companyImages/Koulu_visited.png'),
  Futurice_visited: require('../../../images/companyImages/Futurice_visited.png'),
  Oracle_visited: require('../../../images/companyImages/Oracle_visited.png'),
  Reaktor_visited: require('../../../images/companyImages/Reaktor_visited.png'),
  Rovio_visited: require('../../../images/companyImages/Rovio_visited.png'),
  Sigmatic_visited: require('../../../images/companyImages/Sigmatic_visited.png'),
  Supercell_visited: require('../../../images/companyImages/Supercell_visited.png'),
  Appelsiini_visited: require('../../../images/companyImages/Appelsiini_visited.png'),
  Zalando_visited: require('../../../images/companyImages/Zalando_visited.png')
};

var COMPANIES_PER_ROW = 3;

const CheckPointView = React.createClass({
  getInitialState() {
    return {
      refreshInterval: null
    };
  },

  componentDidMount() {
    this.fetchData();
    this.setState({
      refreshInterval: setInterval(this.fetchData, 60 * 1000)
    });
  },

  componentWillUnmount() {
    clearInterval(this.state.refreshInterval);
  },

  fetchData() {
    this.props.refresh();
  },

  renderCompany(company) {
    const visited = company.visited ? '_visited' : '';
    const image = images[`${company.companyName}${visited}`];

    if (!image) {
      return null;
    }
    return (
      <TouchableOpacity
        key={company.companyId}>
        <View style={styles.companyRow}>
          <Image style={styles.thumb} source={image} />
          <Text style={styles.companyText}>{company.companyName}</Text>
        </View>
      </TouchableOpacity>
    );
  },


  render() {
    let visitedCompanies = 0;

    this.props.companies.data.forEach((company) => {
      if (company.visited) {
        visitedCompanies += 1;
      }
    });

    if(visitedCompanies >= this.props.companies.data.length && this.props.companies.data.length != 0){
      return (
        <TeamPointsView />
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Rastit
            </Text>
          </View>
          <GridView
            items={this.props.companies.data}
            itemsPerRow={COMPANIES_PER_ROW}
            renderItem={this.renderCompany}
            style={styles.companyList}
            enableEmptySections={true}
            />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.map()}>
              <Text style={[styles.whiteFont, {fontWeight: 'bold'}]}>{'KARTTA'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafafa'
  },
  header: {
    elevation: 5,
    alignSelf: 'stretch',
    backgroundColor: '#fe9593',
    height: 64,
    justifyContent: 'center'
  },
  headerText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  companyRow: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: 100
  },
  companyList: {
    marginTop: 20
  },
  companyText: {
    fontSize: 20
  },
  thumb: {
    width: 100,
    height: 100
  },
  text: {
    fontSize: 24,
    padding: 5,
    justifyContent: 'flex-start'
  },
  buttonText: {
    margin: 10,
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonContainer: {
    backgroundColor: AppStyles.whiteBackground,
    elevation: 5,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    margin: 20,
  },
  button: {
    backgroundColor: AppStyles.darkRed,
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 70,
    padding: 20
  },
  whiteFont: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize
  },
});

export default CheckPointView;

import React, {PropTypes} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PuzzleContainer from '../puzzle/PuzzleContainer';
import * as GameState from './GameState';

const GameView = React.createClass({
  propTypes: {
    puzzle: PropTypes.array,
    solution: PropTypes.object,
    gameState: PropTypes.object.isRequired,
    initialiseGame: PropTypes.func.isRequired
  },

  componentDidMount() {
    const {
      initialiseGame,
      gameState
    } = this.props;

    const {
      gameStatus
    } = gameState;

    if (gameStatus === GameState.NO_GAME) {
      initialiseGame();
    }
  },

  render() {
    const {
      gameState
    } = this.props;

    const {
      puzzle,
      solution,
      gameStatus,
      wordsToFind,
      timeStarted
    } = gameState;

    let contentView;
    const timePassed = Math.round((Date.now() - timeStarted) / 1000);
    let footerText = `Time: ${timePassed}s`;
    if (gameStatus === GameState.GAME_COMPLETED) {
      footerText = `Game ended in ${timePassed}s`;
    }


    switch (gameStatus) {
      case GameState.GAME_CREATED: {
        contentView = (
          <View style={styles.container}>
           <Text style={styles.title}>
              Words to find: {wordsToFind || solution.found.length}
            </Text>
            <PuzzleContainer
              puzzle={puzzle}
              solution={solution}
            />
            <Text style={styles.title}>
             {footerText}
            </Text>
          </View>
        );

        break;
      }
      case GameState.GAME_RUNNING: {
        contentView = (
          <View style={styles.container}>
           <Text style={styles.title}>
              Words to find: {wordsToFind || solution.found.length}
            </Text>
            <PuzzleContainer
              puzzle={puzzle}
              solution={solution}
            />
            <Text style={styles.title}>
             {footerText}
            </Text>
          </View>
        );

        break;
      }
      case GameState.NO_GAME:
      default: {
        contentView = (
          <ActivityIndicator
            animating
            style={styles.activityIndicator}
            size='large'
          />
        );
      }
    }

    return (
      <View style={styles.activityIndicator}>
        {contentView}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  activityIndicator: {
    flex: 1,
    alignSelf: 'center'
  },
  title: {
    alignSelf: 'center',
    margin: 5
  }
});

export default GameView;

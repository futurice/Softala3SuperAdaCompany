import React, {PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import PuzzleContainer from '../puzzle/PuzzleContainer';
import * as GameState from './GameState';

const GameView = React.createClass({
  propTypes: {
    puzzle: PropTypes.array.isRequired,
    solution: PropTypes.object.isRequired,
    gameState: PropTypes.object.isRequired
  },

  render() {
    const {
      puzzle,
      solution,
      gameState
    } = this.props;

    const {
      gameStatus,
      wordsToFind,
      timeStarted
    } = gameState;

    const timePassed = Math.round((Date.now() - timeStarted) / 1000);
    let footerText = `Time: ${timePassed}s`;
    if (gameStatus === GameState.GAME_COMPLETED) {
      footerText = `Game ended in ${timePassed}s`;
    }

    return (
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
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  title: {
    alignSelf: 'center',
    margin: 5
  }
});

export default GameView;

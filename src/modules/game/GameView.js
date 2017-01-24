import React, {PropTypes} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import PuzzleContainer from '../puzzle/PuzzleContainer';
import * as GameState from './GameState';
import AppStyles from '../AppStyles';

const resetGame = (component) => (event) => {
  event.preventDefault();

  const {
    deleteGame,
    initialiseGame,
    refresh
  } = component.props;

  deleteGame();
  initialiseGame();
  refresh();
};

const GameView = React.createClass({
  propTypes: {
    puzzle: PropTypes.array,
    solution: PropTypes.object,
    gameState: PropTypes.object.isRequired,
    initialiseGame: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired
  },

  componentWillMount() {
    const {
      refresh
    } = this.props;

    refresh();
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
      gameState,
      quizStatus,
      setQuizPoints
    } = this.props;

    const {
      puzzle,
      solution,
      gameStatus,
      wordsToFind,
      timeStarted,
      timeEnded
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
           <Text style={styles.footer}>
              Words to find: {wordsToFind || solution.found.length}
            </Text>
            <PuzzleContainer
              puzzle={puzzle}
              solution={solution}
            />
            <Text style={styles.title}>
             {footerText} - {quizStatus.data.points}
            </Text>
          </View>
        );

        break;
      }
      case GameState.GAME_RUNNING: {
        contentView = (
          <View style={styles.puzzleContainer}>
           <Text style={styles.footer}>
              Words to find: {wordsToFind || solution.found.length}
            </Text>
            <PuzzleContainer
              puzzle={puzzle}
              solution={solution}
            />
            <Text style={styles.footer}>
             {footerText}
            </Text>
          </View>
        );

        break;
      }
      case GameState.GAME_COMPLETED: {
        // TODO: move this into a config
        const pointsPerMinute = 10;
        const pointsPerWord = 5;
        const pointsCompleted = 100;
        const maxMinutes = 15;

        // Points per minutes
        const timeToComplete = Math.round((timeEnded - timeStarted) / 1000);
        const minutes = Math.round(timeToComplete / 60);
        const minutesPoints = Math.max((maxMinutes - minutes) * pointsPerMinute, 0);

        const wordsFound = solution.found.length - wordsToFind;
        const wordsPoints = wordsFound * pointsPerWord;

        const totalPoints = Math.round(pointsCompleted + wordsPoints + minutesPoints);

        if (!quizStatus.data.done) {
          setQuizPoints(totalPoints);
        }

        contentView = (
          <View style={styles.container}>
            <Text style={styles.titleText}>
              Congratulations!
            </Text>
            <Text style={styles.textBody}>
              {`Puzzle completed in ${minutes} mins: ${minutesPoints} points`}
            </Text>
            <Text style={styles.textBody}>
              {`${wordsFound} words (${pointsPerWord} points per word): ${wordsPoints} points`}
            </Text>
            <Text style={styles.textBody}>
              {wordsFound === solution.found.length
                ? `You have found all the words: ${pointsCompleted} points`
                : 'You have not completed the puzzle: 0 points'
              }
            </Text>
            <Text style={styles.textBody}>
              {`Total points: ${totalPoints}`}
            </Text>
            {
              __DEV__
              ? <TouchableOpacity
                  style={styles.button}
                  onPress={resetGame(this)}>
                    <Text style={styles.buttonText}>New Game</Text>
                </TouchableOpacity> : <div/>
            }
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
      <View style={styles.puzzleContainer}>
        {contentView}
      </View>
    );
  }
});

const centered = {
  alignSelf: 'center'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: AppStyles.darkRed
  },
  puzzleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: AppStyles.darkRed
  },
  titleText: {
    paddingTop: 20,
    marginBottom: 40,
    fontSize: AppStyles.titleFontSize,
    fontWeight: 'bold',
    color: AppStyles.white,
    textAlign: 'center'
  },
  activityIndicator: {
    flex: 1,
    ...centered
  },
  footer: {
    ...centered,
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
    margin: 5
  },
  button: {
    backgroundColor: AppStyles.lightRed,
    alignItems: 'center',
    alignSelf: 'stretch',
    elevation: 5,
    height: 70,
    padding: 20,
    marginTop: 200
  },
  buttonText: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
    fontWeight: 'bold'
  },
  textBody: {
    ...centered,
    color: AppStyles.white,
    marginTop: 10,
    fontSize: AppStyles.fontSize
  }
});

export default GameView;

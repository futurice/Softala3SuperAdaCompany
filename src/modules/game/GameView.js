import React, {PropTypes, Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
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

const togglePause = (component) => (event) => {
  event.preventDefault();

  const {
    pauseGame,
    restartGame,
    gameState
  } = component.props;

  const {
    gameStatus
  } = gameState;

  if (gameStatus === GameState.GAME_PAUSE) {
    restartGame();
  } else {
    pauseGame();
  }
};

const tick = (component) => {
  const {
    gameState,
    tickTimer
  } = component.props;

  const {
    gameStatus
  } = gameState;

  if (gameStatus === GameState.GAME_CREATED ||
    gameStatus === GameState.GAME_RUNNING) {
    tickTimer();
  }

  component.setTimeout(
    () => tick(component),
    1000 * 60 // 1 minute
  );
};

class GameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: Date.now()
    };
  }

  componentWillMount() {
    const {
      initialiseGame,
      gameState,
      refresh
    } = this.props;

    const {
      gameStatus
    } = gameState;

    refresh();

    if (gameStatus === GameState.NO_GAME) {
      initialiseGame();
    }
  }

  componentDidMount() {
    // Start the timer
    tick(this);
  }

  // TODO: render grew too big
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
      timeEnded,
      timer
    } = gameState;

    let contentView;
    const timePassed = `${Math.round(Math.max(0, (timer - timeStarted) / 1000 / 60))}m`;
    let footerText = `Time: ${timePassed} ${gameStatus === GameState.GAME_PAUSE ? '(paused)' : ''}`;
    if (gameStatus === GameState.GAME_COMPLETED) {
      footerText = `Game ended in ${timePassed}`;
    }

    switch (gameStatus) {
      case GameState.GAME_CREATED:
      case GameState.GAME_PAUSE:
      case GameState.GAME_RUNNING: {
        contentView = (
          <View style={styles.gameContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.wordsToFind}>
                Words to find: {wordsToFind || solution.found.length}
              </Text>
              <Text style={styles.timer}>
                {footerText}
              </Text>
            </View>
            <PuzzleContainer
              puzzle={puzzle}
              solution={solution}
              gameStatus={gameStatus}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={togglePause(this)}>
              <Text style={styles.buttonText}>{gameStatus === GameState.GAME_RUNNING ? 'Pause' : 'Restart'}</Text>
            </TouchableOpacity>
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
          <View style={styles.gameContainer}>
            <Text style={styles.congratsText}>
              Congratulations!
            </Text>
            <Text style={styles.congratsBodyText}>
              {`Puzzle completed in ${minutes} mins: ${minutesPoints} points`}
            </Text>
            <Text style={styles.congratsBodyText}>
              {`${wordsFound} words (${pointsPerWord} points per word): ${wordsPoints} points`}
            </Text>
            <Text style={styles.congratsBodyText}>
              {wordsFound === solution.found.length
                ? `You have found all the words: ${pointsCompleted} points`
                : 'You have not completed the puzzle: 0 points'
              }
            </Text>
            <Text style={styles.congratsBodyText}>
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
      <View style={styles.gameContainer}>
        {contentView}
      </View>
    );
  }
}

GameView.propTypes = {
  puzzle: PropTypes.array,
  solution: PropTypes.object,
  gameState: PropTypes.object.isRequired,
  initialiseGame: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  quizStatus: PropTypes.object.isRequired,
  setQuizPoints: PropTypes.func.isRequired
};

reactMixin(GameView.prototype, TimerMixin);

const centered = {
  alignSelf: 'center'
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: AppStyles.darkRed
  },
  activityIndicator: {
    ...centered
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5
  },
  wordsToFind: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
    textAlign: 'center'
  },
  timer: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
    textAlign: 'center'
  },
  button: {
    backgroundColor: AppStyles.lightRed,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    elevation: 5,
    height: 70,
    marginBottom: 30
  },
  congratsText: {
    paddingTop: 20,
    marginBottom: 40,
    fontSize: AppStyles.titleFontSize,
    fontWeight: 'bold',
    color: AppStyles.white,
    textAlign: 'center'
  },
  congratsBodyText: {
    ...centered,
    color: AppStyles.white,
    marginTop: 10,
    fontSize: AppStyles.fontSize
  },
  buttonText: {
    color: AppStyles.white,
    fontSize: AppStyles.fontSize,
    fontWeight: 'bold'
  }
});

export default GameView;

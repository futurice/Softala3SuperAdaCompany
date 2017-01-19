// Actions
const GAME_PAUSED = 'Game/GAME_PAUSED';
const GAME_STARTED = 'Game/GAME_STARTED';
const GAME_RUNNING = 'Game/GAME_RUNNING';
const GAME_COMPLETED = 'Game/GAME_COMPLETED';
const NUM_WORDS_TO_FIND = 'Game/NUM_WORDS_TO_FIND';

export function gameStarted(time) {
  return {
    type: GAME_STARTED,
    payload: time
  };
}

export function gameCompleted(time) {
  return {
    type: GAME_COMPLETED,
    payload: time
  };
}

export function wordsToFind(numOfWordsToFind) {
  return {
    type: NUM_WORDS_TO_FIND,
    payload: numOfWordsToFind
  };
}

const initialState = {
  gameStatus: GAME_PAUSED,
  timeStarted: null,
  timeEnded: null,
  wordsToFind: null
};

export default function GameStateReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_STARTED: {
      state.gameStatus = GAME_RUNNING;
      state.timeStarted = action.payload;
      return state;
    }
    case GAME_COMPLETED: {
      state.gameStatus = GAME_COMPLETED;
      state.timeEnded = action.payload;

      return state;
    }
    case NUM_WORDS_TO_FIND: {
      state.wordsToFind = action.payload;

      return state;
    }
    default:
      return state;
  }
}

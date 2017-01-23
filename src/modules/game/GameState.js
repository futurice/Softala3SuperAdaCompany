import Wordfind from '../puzzle/wordfind';

// Actions
export const NO_GAME = 'Game/NO_GAME';
export const GAME_INIT = 'Game/GAME_INIT';
export const GAME_CREATED = 'Game/GAME_CREATED';
export const GAME_STARTED = 'Game/GAME_STARTED';
export const GAME_RUNNING = 'Game/GAME_RUNNING';
export const GAME_COMPLETED = 'Game/GAME_COMPLETED';
export const NUM_WORDS_TO_FIND = 'Game/NUM_WORDS_TO_FIND';
export const PRESSED_CELL = 'Puzzle/PRESSED_CELL';

export function initGame() {
  return {
    type: GAME_INIT
  };
}

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

export function pressedCell(cell) {
  return {
    type: PRESSED_CELL,
    payload: cell
  };
}

const randomWords = (words, quantity = __DEV__ ? 5 : 21) => {
  let hit = { };
  let i = quantity;
  const rands = quantity;

  while (i > 0 || Object.keys(hit).length < rands) {
    hit[Math.ceil(Math.random() * words.length)] = i--;
  }

  return Object.keys(hit).map((key) => words[key - 1]);
};

const initialState = {
  gameStatus: NO_GAME,
  timeStarted: null,
  timeEnded: null,
  wordsToFind: null,
  puzzle: null,
  solution: null,
  pressedCells: [],
  discoveredSoFar: null
};

export default function GameStateReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_INIT: {
      const words = ['ada', 'lovelace', 'mobile', 'data', 'robot', 'infrastructure', 'testing', 'teamwork',
        'code', 'binary', 'api', 'agile', 'software', 'project', 'design', 'creativity', 'opensource',
        'motherboard', 'bug', 'feature', 'internet', 'online', 'interface', 'hypertext',
        'javascript', 'automation', 'programming', 'computer',
        'gaming', 'platform', 'meetings'];
      const puzzleWords = randomWords(words);
      const puzzle = Wordfind.newPuzzle(puzzleWords, {
        height: 14,
        width: 14,
        preferOverlap: true,
        maxAttempts: 5,
        fillBlanks: !__DEV__
      });

      const solution = Wordfind.solve(puzzle, words);
      return {
        ...state,
        gameStatus: GAME_CREATED,
        puzzle: puzzle,
        solution: solution
      };
    }
    case GAME_CREATED: {
      return {
        ...state,
        gameStatus: GAME_CREATED
      };
    }
    case GAME_STARTED: {
      return {
        ...state,
        gameStatus: GAME_RUNNING,
        timeStarted: action.payload
      };
    }
    case GAME_COMPLETED: {
      return {
        ...state,
        gameStatus: GAME_COMPLETED,
        timeEnded: action.payload
      };
    }
    case NUM_WORDS_TO_FIND: {
      return {
        ...state,
        wordsToFind: action.payload
      };
    }
    case PRESSED_CELL: {
      const {pressedCells} = state;

      return {
        ...state,
        pressedCells: pressedCells.push(action.payload)
      };
    }
    default:
      return state;
  }
}

/*eslint-disable react/prop-types*/

import React from 'react';
import Wordfind from './puzzle/wordfind';
import GameViewContainer from './game/GameViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import ExampleViewContainer from './exampleView/ExampleViewContainer';
import LoginViewContainer from './login/LoginViewContainer';
import FeedbackViewContainer from './feedback/FeedbackViewContainer';
import MapViewContainer from './map/MapViewContainer';
import TeamViewContainer from './team/TeamViewContainer';
import WelcomeViewContainer from './welcome/WelcomeViewContainer';
import CheckPointViewContainer from './checkpoints/CheckPointViewContainer';
import GoodbyeViewContainer from './goodbye/GoodbyeViewContainer';
import GoodbyeFeedbackViewContainer from './goodbyeFeedback/GoodbyeFeedbackViewContainer';
import TeamPointsViewContainer from './teamPoints/TeamPointsViewContainer';

const randomWords = (words, quantity = 21) => {
  let hit = { };
  let i = quantity;
  const rands = quantity;

  while (i > 0 || Object.keys(hit).length < rands) {
    hit[Math.ceil(Math.random() * words.length)] = i--;
  }

  return Object.keys(hit).map((key) => words[key - 1]);
};

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const key = props.scene.route.key;

  if (key === 'Puzzle') {
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
      fillBlanks: true
    });

    const solution = Wordfind.solve(puzzle, words);
    return <GameViewContainer
      puzzle={puzzle}
      solution={solution}
      />;
  }

  if (key.indexOf('Color') === 0) {
    const index = props.scenes.indexOf(props.scene);
    return (
      <ColorViewContainer
        index={index}
      />
    );
  }
    if (key === 'ExampleView') {
      return <ExampleViewContainer />;
    }

    if (key === 'LoginView') {
      return <LoginViewContainer />;
    }

    if (key === 'FeedbackView') {
       return <FeedbackViewContainer />;
     }

    if (key === 'Welcome') {
      return <WelcomeViewContainer />;
    }

    if (key === 'MapView') {
      return <MapViewContainer />;
    }
    if (key === 'CheckPoints') {
      return <CheckPointViewContainer />;
    }

    if (key === 'TeamView') {
      return <TeamViewContainer />;
    }

    if (key === 'Goodbye') {
      return <GoodbyeViewContainer />;
    }

    if (key === 'GoodbyeFB') {
      return <GoodbyeFeedbackViewContainer />;
    }

    if (key === 'TeamPointsView') {
      return <TeamPointsViewContainer />;
    }

  throw new Error('Unknown navigation key: ' + key);
}

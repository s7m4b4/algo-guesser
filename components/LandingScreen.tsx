import * as React from 'react';
import { GameStateContextType } from '../@types/gamestate';
import { GameContext } from '../context/GameState';
import Settings from './Settings';

export default function LandingScreen() {
  const { setGameState } = React.useContext(GameContext) as GameStateContextType;

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="pb-2 text-4xl font-semibold tracking-widest text-center text-gray-100 border-b-4 border-gray-100">
        AlgoGuesser
      </h1>
      <Settings />
      <button
        className="w-full p-3 bg-white rounded-full"
        onClick={() => {
          setGameState('game');
        }}
      >
        Start
      </button>
    </div>
  );
}

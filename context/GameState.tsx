import * as React from 'react';
import { GameState, GameStateContextType } from '../@types/gamestate';

export const GameContext = React.createContext<GameStateContextType | null>(null);

type GameStateProps = {
  children: React.ReactNode;
}

const GameStateProvider: React.FC<GameStateProps> = ({ children }) => {
  const [gameState, setGameState] = React.useState<GameState>('landing');

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameStateProvider;
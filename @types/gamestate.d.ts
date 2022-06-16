import React from "react";

export type GameState = "landing" | "game" | "end";

export interface GameStateContextType {
  gameState: GameState;
  setGameState: React.Dispatch;
}

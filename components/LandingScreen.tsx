import * as React from "react";
import { GameStateContextType } from "../@types/gamestate";
import { GameContext } from "../context/GameState";

export default function LandingScreen() {
  const { setGameState } = React.useContext(GameContext) as GameStateContextType

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-semibold tracking-widest text-white">AlgoGuesser</h1>
      <button className="w-full p-3 bg-white rounded-full" onClick={() => { setGameState("game"); }}>Start</button>
    </div>
  )
}

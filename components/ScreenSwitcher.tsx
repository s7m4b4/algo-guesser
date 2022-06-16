import { GameState, GameStateContextType } from "../@types/gamestate"
import GameScreen from "./GameScreen"
import LandingScreen from "./LandingScreen"
import * as React from 'react';
import { GameContext } from "../context/GameState";


const ScreenSwitcher = () => {
    const { gameState } = React.useContext(GameContext) as GameStateContextType

    const showGameScreen = (state: GameState) => {
        switch (state) {
        case "landing":
            return (<LandingScreen />)
        case "game":
            return (<GameScreen />)
        default:
            return (<LandingScreen />)
        }
    }

    return (
        <>
        {showGameScreen(gameState)}
        </>
    )    
}

export default ScreenSwitcher
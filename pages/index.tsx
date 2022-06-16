import GameStateProvider from "../context/GameState"
import ScreenSwitcher from "../components/ScreenSwitcher";

export default function Index() {

  return (
    <div className="flex items-center justify-center h-screen p-12 bg-gradient-to-br from-indigo-900 via-blue-500 to-cyan-400">
      <GameStateProvider>
        <ScreenSwitcher />
      </GameStateProvider>
    </div>
  );
}

import GameStateProvider from '../context/GameState';
import ScreenSwitcher from '../components/ScreenSwitcher';
import SettingsProvider from '../context/Settings';

export default function Index() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-900 via-blue-500 to-cyan-400">
      <GameStateProvider>
        <SettingsProvider>
          <ScreenSwitcher />
        </SettingsProvider>
      </GameStateProvider>
    </div>
  );
}

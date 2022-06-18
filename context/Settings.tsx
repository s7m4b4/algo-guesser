import * as React from 'react';
import { SettingsContextType, DifficultyOptions } from '../@types/settings';
import { options } from '../components/Settings';
import { MultiValue } from 'react-select';

export const SettingsContext = React.createContext<SettingsContextType | null>(null);

type SettingsProviderProps = {
  children: React.ReactNode;
}

const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [showDifficulty, setShowDifficulty] = React.useState(true)
  const [showTitle, setShowTitle] = React.useState(true)
  const [difficulty, setDifficulty] = React.useState<DifficultyOptions[]>(options)

  const handleShowDifficulty = () => {
    setShowDifficulty(!showDifficulty)
  }

  const handleShowTitle = () => {
    setShowTitle(!showTitle)
  }

  const handleDifficulty = (value: MultiValue<DifficultyOptions>) => {
    setDifficulty(value as DifficultyOptions[]);
  }

  return (
    <SettingsContext.Provider value={{ showDifficulty, handleShowDifficulty, showTitle, handleShowTitle, difficulty, handleDifficulty }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
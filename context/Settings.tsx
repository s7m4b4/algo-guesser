import * as React from 'react';

import { DifficultyOptions, SettingsContextType } from '../types/settings';
import { difficultyOptions } from '../components/Settings';

export const SettingsContext = React.createContext<SettingsContextType | null>(null);

type SettingsProviderProps = {
  children: React.ReactNode;
};

const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [showDifficulty, setShowDifficulty] = React.useState(false);
  const [showTitle, setShowTitle] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState<DifficultyOptions[]>(difficultyOptions);

  const handleShowDifficulty = () => {
    setShowDifficulty(!showDifficulty);
  };

  const handleShowTitle = () => {
    setShowTitle(!showTitle);
  };

  const handleDifficulty = (value: any) => {
    setDifficulty(value);
  };

  return (
    <SettingsContext.Provider
      value={{ showDifficulty, handleShowDifficulty, showTitle, handleShowTitle, difficulty, handleDifficulty }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

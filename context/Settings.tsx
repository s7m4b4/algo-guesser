import * as React from 'react';

import { QuizMode, SelectOptions, SettingsContextType } from '../types/settings';
import { defaultTopicsOptions, difficultyOptions } from '../components/Settings';

export const SettingsContext = React.createContext<SettingsContextType | null>(null);

type SettingsProviderProps = {
  children: React.ReactNode;
};

const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [showDifficulty, setShowDifficulty] = React.useState(true);
  const [showTitle, setShowTitle] = React.useState(true);
  const [difficulty, setDifficulty] = React.useState<SelectOptions[]>(difficultyOptions);
  const [mode, setMode] = React.useState<SelectOptions>({ value: QuizMode.Endless, label: 'Endless' });
  const [numQuestions, setNumQuestions] = React.useState<number>(10);
  const [topics, setTopics] = React.useState<SelectOptions[]>(defaultTopicsOptions);
  const [timer, setTimer] = React.useState<number>(60);

  const handleShowDifficulty = () => {
    setShowDifficulty(!showDifficulty);
  };

  const handleShowTitle = () => {
    setShowTitle(!showTitle);
  };

  const handleDifficulty = (value: any) => {
    setDifficulty(value);
  };

  const handleMode = (selectedOption: any) => {
    setMode(selectedOption);
  };

  const handleNumQuestions = (valueStr: string, valueInt: number) => {
    if (valueStr !== '') {
      setNumQuestions(valueInt);
    }
  };

  const handleTopics = (topic: any) => {
    setTopics(topic);
  };

  const handleTimer = (valueStr: string, valueInt: number) => {
    setTimer(valueInt);
  };

  return (
    <SettingsContext.Provider
      value={{
        showDifficulty,
        handleShowDifficulty,
        showTitle,
        handleShowTitle,
        difficulty,
        handleDifficulty,
        mode,
        handleMode,
        numQuestions,
        handleNumQuestions,
        topics,
        handleTopics,
        timer,
        handleTimer,
        setTimer
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

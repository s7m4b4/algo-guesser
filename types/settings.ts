import { ActionMeta, MultiValue } from 'chakra-react-select';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

type OnChange = (value: MultiValue<DifficultyOptions>, actionMeta: ActionMeta<DifficultyOptions>) => void;

export interface DifficultyOptions {
  value: string;
  label: string;
}

export interface SettingsContextType {
  showDifficulty: boolean;
  handleShowDifficulty: () => void;
  showTitle: boolean;
  handleShowTitle: () => void;
  difficulty: DifficultyOptions[];
  handleDifficulty: OnChange;
}

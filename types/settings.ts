import { ActionMeta, MultiValue } from 'chakra-react-select';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export enum QuizMode {
  Endless = 'endless',
  Timed = 'timed',
  Fixed = 'fixed'
}

type OnChange<T> = (value: MultiValue<T>, actionMeta: ActionMeta<T>) => void;

export interface SelectOptions {
  value: string;
  label: string;
  colorScheme?: string;
}

export interface SettingsContextType {
  showDifficulty: boolean;
  handleShowDifficulty: () => void;
  showTitle: boolean;
  handleShowTitle: () => void;
  difficulty: SelectOptions[];
  handleDifficulty: OnChange<SelectOptions>;
  mode: SelectOptions;
  handleMode: (selectedOption: any) => void;
  numQuestions: number;
  handleNumQuestions: (valueStr: string, valueInt: number) => void;
  topics: SelectOptions[];
  handleTopics: (topic: any) => void;
  timer: number;
  handleTimer: (valueStr: string, valueInt: number) => void;
  setTimer: any;
}

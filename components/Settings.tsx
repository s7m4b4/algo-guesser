import * as React from 'react';
import Select, { StylesConfig } from 'react-select';
import { DifficultyOptions, SettingsContextType } from '../@types/settings';
import { SettingsContext } from '../context/Settings';

export const options: DifficultyOptions[] = [
  { value: 'easy', label: 'Easy', bg: 'rgb(187, 247, 208)', color: 'rgb(20, 83, 45)' },
  { value: 'medium', label: 'Medium', bg: 'rgb(254, 215, 170)', color: 'rgb(124, 45, 18)' },
  { value: 'hard', label: 'Hard', bg: 'rgb(254, 202, 202)', color: 'rgb(127, 29, 29)' }
];

const styles: StylesConfig<DifficultyOptions, true> = {
  option: (styles, { data }) => {
    return {
      ...styles,
      color: data.color,
      fontSize: '0.75rem',
      backgroundColor: data.bg,
      fontWeight: 700
    };
  },

  multiValue: (styles, { data }) => {
    return {
      ...styles,
      color: data.color,
      fontSize: '0.75rem',
      backgroundColor: data.bg,
      fontWeight: 700
    };
  },

  multiValueLabel: (styles) => ({
    ...styles
  })
};

const Settings: React.FC = () => {
  const { showDifficulty, handleShowDifficulty, showTitle, handleShowTitle, difficulty, handleDifficulty } =
    React.useContext(SettingsContext) as SettingsContextType;

  return (
    <div className="flex flex-col p-4 space-y-2 bg-white rounded shadow-lg">
      <span className="font-semibold">Settings</span>
      <div>
        <label
          className="inline-block text-xs text-gray-900 align-middle select-none"
          htmlFor="c"
          onClick={handleShowTitle}
        >
          Select question difficulty
        </label>
        <Select
          instanceId="difficulty-select"
          defaultValue={options}
          options={options}
          value={difficulty}
          onChange={handleDifficulty}
          styles={styles}
          isMulti
        />
      </div>
      <div className="flex flex-col">
        <div>
          <input
            name="c"
            className="w-4 h-4 mx-2 align-middle transition duration-75 bg-white border border-gray-400 rounded-sm appearance-none cursor-pointer checked:bg-blue-400 checked:border-blue-600 focus:outline-none"
            type="checkbox"
            checked={showDifficulty}
            onChange={handleShowDifficulty}
          />
          <label
            className="inline-block text-xs text-gray-900 align-middle select-none"
            htmlFor="c"
            onClick={handleShowDifficulty}
          >
            Show difficulty label
          </label>
        </div>
        <div>
          <input
            name="c"
            className="w-4 h-4 mx-2 align-middle transition duration-75 bg-white border border-gray-400 rounded-sm appearance-none cursor-pointer checked:bg-blue-400 checked:border-blue-600 focus:outline-none"
            type="checkbox"
            checked={showTitle}
            onChange={handleShowTitle}
          />
          <label
            className="inline-block text-xs text-gray-900 align-middle select-none"
            htmlFor="c"
            onClick={handleShowTitle}
          >
            Show question title
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;

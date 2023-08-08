import * as React from 'react';
import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

import { SettingsContextType, QuizMode, SelectOptions } from '../types/settings';
import { SettingsContext } from '../context/Settings';
import { categories, totalQuestions } from '../lib/question';
import { defaultTopics } from '../constants';

export const difficultyOptions: SelectOptions[] = [
  { value: 'Easy', label: 'Easy', colorScheme: 'green' },
  { value: 'Medium', label: 'Medium', colorScheme: 'orange' },
  { value: 'Hard', label: 'Hard', colorScheme: 'red' }
];

export const topicOptions = categories.map((tag: any) => ({ value: tag, label: tag }));
export const defaultTopicsOptions = topicOptions.filter((option) => defaultTopics.includes(option.value));
export const modeOptions = Object.values(QuizMode).map((mode) => ({
  value: mode,
  label: mode.charAt(0).toUpperCase() + mode.slice(1)
}));

const Settings: React.FC = () => {
  const {
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
    handleTimer
  } = React.useContext(SettingsContext) as SettingsContextType;

  return (
    <Flex bg="white" rounded="md" shadow="md" padding="4" w={['xs', 'sm']}>
      <Stack direction="column" w="full">
        <Text fontSize="sm" fontWeight="bold">
          Settings
        </Text>
        <FormControl>
          <FormLabel fontSize="xs">Select difficulty</FormLabel>
          <Select
            isMulti
            name="difficulty"
            placeholder="Select difficulties"
            closeMenuOnSelect={false}
            instanceId="difficulty-selector"
            size="sm"
            value={difficulty}
            onChange={handleDifficulty}
            options={difficultyOptions}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="xs">Select topics</FormLabel>
          <Select
            isMulti
            name="tags"
            placeholder="Select tags"
            closeMenuOnSelect={false}
            instanceId="tag-selector"
            size="sm"
            value={topics}
            onChange={handleTopics}
            options={topicOptions}
          />
        </FormControl>
        <FormControl id="hlelo">
          <FormLabel fontSize="xs">Select game mode</FormLabel>
          <Select
            name="mode"
            placeholder="Select Mode"
            instanceId="mode-selector"
            size="sm"
            value={mode}
            onChange={handleMode}
            options={modeOptions}
          />
        </FormControl>
        {mode && mode.value === QuizMode.Fixed && (
          <FormControl>
            <FormLabel fontSize="xs">Number of questions</FormLabel>
            <NumberInput min={1} max={totalQuestions} value={numQuestions} onChange={handleNumQuestions}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        )}
        {mode && mode.value === QuizMode.Timed && (
          <FormControl>
            <FormLabel fontSize="xs">Timer</FormLabel>
            <NumberInput min={10} value={timer} onChange={handleTimer}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        )}
        <Text fontSize="sm" fontWeight="bold">
          Extras
        </Text>
        <Checkbox size="sm" colorScheme="blue" isChecked={showTitle} onChange={handleShowTitle}>
          Show title
        </Checkbox>
        <Checkbox size="sm" colorScheme="blue" isChecked={showDifficulty} onChange={handleShowDifficulty}>
          Show difficulty
        </Checkbox>
      </Stack>
    </Flex>
  );
};

export default Settings;

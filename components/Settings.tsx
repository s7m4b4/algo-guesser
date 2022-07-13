import * as React from 'react';
import { Checkbox, Flex, FormControl, FormLabel, Stack, Text } from '@chakra-ui/react';
import { GroupBase, OptionBase, Select } from 'chakra-react-select';

import { DifficultyOptions, SettingsContextType } from '../types/settings';
import { SettingsContext } from '../context/Settings';

interface Options extends OptionBase {
  label: string;
  value: string;
  color?: string;
}
export const difficultyOptions: DifficultyOptions[] = [
  { value: 'green', label: 'Easy' },
  { value: 'orange', label: 'Medium' },
  { value: 'red', label: 'Hard' }
];

const Settings: React.FC = () => {
  const { showDifficulty, handleShowDifficulty, showTitle, handleShowTitle, difficulty, handleDifficulty } =
    React.useContext(SettingsContext) as SettingsContextType;

  return (
    <Flex bg="white" rounded="md" shadow="md" padding="4" w={['xs', 'sm']}>
      <Stack direction="column" w="full">
        <Text fontSize="sm" fontWeight="bold">
          Settings
        </Text>
        <FormControl>
          <FormLabel fontSize="xs">Select difficulty</FormLabel>
          <Select<Options, true, GroupBase<Options>>
            isMulti
            name="colors"
            placeholder="Select difficulties"
            closeMenuOnSelect={false}
            instanceId="difficulty-selector"
            size="sm"
            value={difficulty}
            onChange={handleDifficulty}
            options={difficultyOptions}
          />
        </FormControl>
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

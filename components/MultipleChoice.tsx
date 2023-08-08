import { Button, SimpleGrid, Text } from '@chakra-ui/react';
import { FiCheckCircle, FiCircle, FiDisc, FiXCircle } from 'react-icons/fi';

import { Question } from '../lib/question';

interface MultipleChoiceProps {
  click: (choice: string) => void;
  choices: string[];
  selected: string[];
  question: Question;
  submitted: boolean;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ click, choices, selected, question, submitted }) => {
  const correctAnswers = (choice: string) => {
    if (!submitted) {
      return {};
    }

    return question.topicTags.includes(choice)
      ? {
          pointerEvents: 'none',
          backgroundColor: 'green.300',
          borderColor: 'green.400',
          color: 'green.800'
        }
      : { pointerEvents: 'none', backgroundColor: 'red.300', borderColor: 'red.400', color: 'red.800' };
  };

  const icon = (choice: string) => {
    const isSelected = selected.includes(choice);
    const isCorrect = question.topicTags.includes(choice);

    if (isSelected && submitted) {
      return isCorrect ? <FiCheckCircle /> : <FiXCircle />;
    }
    return isSelected ? <FiDisc /> : <FiCircle />;
  };

  return (
    <SimpleGrid padding="1" overflowY="auto" columns={{ sm: 1, md: 2 }} spacing="4">
      {choices.map((choice: string) => (
        <Button
          isDisabled={submitted || (selected.length >= question.topicTags.length && !selected.includes(choice))}
          rightIcon={icon(choice)}
          rounded="md"
          justifyContent="space-between"
          border="2px"
          color="black"
          padding={['1.5', '2']}
          bgColor={correctAnswers(choice)}
          onClick={() => click(choice)}
          key={choice}
          sx={correctAnswers(choice)}
        >
          <Text noOfLines={1} fontSize={['xs']}>
            {choice}
          </Text>
        </Button>
      ))}
    </SimpleGrid>
  );
};

export default MultipleChoice;

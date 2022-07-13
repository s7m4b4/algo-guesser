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

    if (question.topicTags.includes(choice)) {
      return {
        pointerEvents: 'none',
        backgroundColor: 'green.300',
        borderColor: 'green.400',
        color: 'green.800'
      };
    } else {
      return { pointerEvents: 'none', backgroundColor: 'red.300', borderColor: 'red.400', color: 'red.800' };
    }
  };

  const icon = (choice: string) => {
    if (selected.includes(choice)) {
      if (submitted && question.topicTags.includes(choice) && selected.includes(choice)) {
        return <FiCheckCircle />;
      }
      return <FiDisc />;
    } else {
      if (submitted && !question.topicTags.includes(choice)) {
        return <FiXCircle />;
      }
      return <FiCircle />;
    }
  };

  return (
    <SimpleGrid padding="1" overflowY="scroll" columns={{ sm: 1, md: 2 }} spacing="4">
      {choices.map((choice: string) => (
        <Button
          disabled={submitted || (selected.length >= question.topicTags.length && !selected.includes(choice))}
          rightIcon={icon(choice)}
          rounded="sm"
          justifyContent="space-between"
          border="1px"
          color="black"
          padding={['1.5', '2']}
          bg="white"
          bgColor={correctAnswers(choice)}
          onClick={() => click(choice)}
          key={choice}
          sx={{ _disabled: correctAnswers(choice) }}
        >
          <Text noOfLines={1} fontSize={['0.5em', 'xs']}>
            {choice}
          </Text>
        </Button>
      ))}
    </SimpleGrid>
  );
};

export default MultipleChoice;

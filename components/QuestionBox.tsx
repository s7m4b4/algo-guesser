import * as React from 'react';
import { Badge, Box, Flex, Link, Text } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

import { Question } from '../lib/question';
import { SettingsContext } from '../context/Settings';
import { SettingsContextType } from '../types/settings';

type QuestionProps = { question: Question; submitted: boolean };

const QuestionBox: React.FC<QuestionProps> = ({ question, submitted }) => {
  const { showTitle, showDifficulty } = React.useContext(SettingsContext) as SettingsContextType;

  const badge = (option: string) => {
    switch (option) {
      case 'Easy':
        return 'green';

      case 'Medium':
        return 'orange';

      case 'Hard':
        return 'red';

      default:
        return 'gray';
    }
  };

  return (
    <Flex flexDirection="column" p="4" bg="white" gap="2" rounded="sm" maxW="2xl" overflowY="scroll">
      {(showDifficulty || showTitle || submitted) && (
        <Flex justifyContent="center" alignItems="center" gap="2" borderBottom="1px" borderColor="gray.200">
          {(showTitle || submitted) && (
            <Text as="b" fontSize="xg">
              <Link href={`https://leetcode.com/problems/${question.titleSlug}`} isExternal>
                <Flex gap="1">
                  {question.title} <FiExternalLink size="0.8em" />
                </Flex>
              </Link>
            </Text>
          )}
          {(showDifficulty || submitted) && (
            <Badge
              colorScheme={badge(question.difficulty)}
              textTransform="capitalize"
              fontSize="0.6em"
              fontWeight="semibold"
              size="sm"
              rounded="md"
            >
              {question.difficulty}
            </Badge>
          )}
        </Flex>
      )}
      <Box id="QuestionBox" overflow="scroll" dangerouslySetInnerHTML={{ __html: question.content }}></Box>
    </Flex>
  );
};

export default QuestionBox;

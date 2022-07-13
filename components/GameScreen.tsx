import * as React from 'react';
import { useState } from 'react';
import { Text, Button, Flex, Heading, Spinner, IconButton, Center, SlideFade } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';

import { GameStateContextType } from '../types/gamestate';
import { SettingsContextType } from '../types/settings';
import MultipleChoice from '../components/MultipleChoice';
import { GameContext } from '../context/GameState';
import { SettingsContext } from '../context/Settings';
import { Question } from '../lib/question';
import QuestionBox from './QuestionBox';

export default function GameScreen() {
  const { score, setScore } = React.useContext(GameContext) as GameStateContextType;
  const { difficulty } = React.useContext(SettingsContext) as SettingsContextType;

  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setLoading] = useState(false);

  async function fetchQuestions() {
    const difficultyQuery = difficulty.map((d) => `difficulty=${d['label']}`);
    const request = await fetch(`api/question?${difficultyQuery}`);
    const { question, choices } = await request.json();
    setQuestion(question);
    setChoices(choices);
  }

  React.useEffect(() => {
    setLoading(true);
    fetchQuestions();
    setLoading(false);
  }, []);

  if (isLoading || !question) return <Spinner color="white" size="xl" />;

  const handleAnswers = (answer: string) => {
    if (answers!.includes(answer)) {
      setAnswers(answers!.filter((item) => item !== answer));
    } else {
      setAnswers((prevState) => [...prevState, answer]);
    }
  };

  const checkAnswer = () => {
    setSubmitted(true);
    const correctAnswers = answers!.filter((value) => question.topicTags.includes(value));
    if (correctAnswers.length > 0) {
      setScore(score + 1);
    }
  };

  const nextRound = () => {
    setQuestion(null);
    setAnswers([]);
    setSubmitted(false);
    fetchQuestions();
  };

  return (
    <Flex paddingY="4" gap="2" maxH="100vh" overflowY="scroll">
      <QuestionBox question={question} submitted={submitted} />
      <Flex padding="2" justifyContent="center" alignContent="center" flexDirection={'column'} gap="2">
        <Center flexDirection="column">
          <Heading as="h4" size={['xs', 'md']} color="white" fontWeight="extrabold">
            How would you solve this?
          </Heading>
          <Text as="i" fontSize="0.6em" color="white">
            (Select up to {question.topicTags.length})
          </Text>
        </Center>
        <MultipleChoice
          selected={answers}
          choices={choices}
          question={question}
          submitted={submitted}
          click={handleAnswers}
        />
        <Button disabled={!answers.length || submitted} onClick={checkAnswer}>
          Check
        </Button>
        <Flex justifyContent="end">
          <SlideFade in={submitted} offsetY="20px">
            <IconButton
              icon={<FiArrowRight />}
              aria-label={'Next Question'}
              disabled={!submitted}
              onClick={nextRound}
            />
          </SlideFade>
        </Flex>
      </Flex>
    </Flex>
  );
}

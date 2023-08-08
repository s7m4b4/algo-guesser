import * as React from 'react';
import { useState } from 'react';
import { Text, Button, Flex, Heading, Spinner, IconButton, Center, SlideFade } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';

import { GameStateContextType } from '../types/gamestate';
import { QuizMode, SettingsContextType } from '../types/settings';
import MultipleChoice from '../components/MultipleChoice';
import { GameContext } from '../context/GameState';
import { SettingsContext } from '../context/Settings';
import QuestionBox from './QuestionBox';
import { Question } from '../lib/question';

export default function GameScreen() {
  const { score, setScore, setGameState } = React.useContext(GameContext) as GameStateContextType;
  const { difficulty, mode, numQuestions, topics, timer, setTimer } = React.useContext(
    SettingsContext
  ) as SettingsContextType;

  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [questionsLeft, setQuestionsLeft] = useState<number>(numQuestions || 0);
  const [countdown, setCountdown] = useState<number>(timer);

  const fetchQuestions = async () => {
    const queryParams = new URLSearchParams({
      difficulty: difficulty.map((option) => option.value).join(','),
      topics: topics.map((option) => option.value).join(',')
    });

    const request = await fetch(`api/question?${queryParams.toString()}`);
    const { question, choices } = await request.json();

    setQuestion(question);
    setChoices(choices);
  };

  React.useEffect(() => {
    setLoading(true);
    fetchQuestions();
    setLoading(false);
  }, []);

  React.useEffect(() => {
    if (mode.value === QuizMode.Timed) {
      const countdownInterval = setInterval(() => {
        if (submitted) {
          clearInterval(countdownInterval);
        } else {
          setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
          if (countdown === 0) {
            clearInterval(countdownInterval);
            checkAnswer();
          }
        }
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [submitted]);

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
    const correctAnswers = answers.filter((value) => question.topicTags.includes(value));
    if (correctAnswers.length > 0) {
      setScore(score + 1);
    }
  };

  const nextRound = () => {
    if (mode.value === QuizMode.Fixed) {
      if (questionsLeft === 1) {
        // todo: impl end screen
        setGameState('landing');
      } else {
        setQuestionsLeft(questionsLeft - 1);
      }
    }

    setCountdown(timer);
    setQuestion(null);
    setAnswers([]);
    setSubmitted(false);
    fetchQuestions();
  };

  return (
    <Flex paddingY="4" gap="2" maxH="100vh" overflowY="auto">
      <QuestionBox question={question} submitted={submitted} />
      <Flex padding="2" justifyContent="center" alignContent="center" flexDirection={'column'} gap="2">
        <Center flexDirection="column">
          <Heading as="h4" size={['xs', 'md']} color="white" fontWeight="extrabold">
            How would you solve this?
          </Heading>
          <Text as="i" fontSize="0.8em" color="white">
            (Select up to {question.topicTags.length})
          </Text>
          <Text as="i" fontSize="0.8em" color="white">
            {mode.value === QuizMode.Fixed && `Questions remaining: ${questionsLeft}`}
          </Text>
          <Text as="i" fontSize="0.8em" color="white">
            {mode.value === QuizMode.Timed && <div>Time remaining: {countdown}</div>}
          </Text>
        </Center>
        <MultipleChoice
          selected={answers}
          choices={choices}
          question={question}
          submitted={submitted}
          click={handleAnswers}
        />
        <Button isDisabled={!answers.length || submitted} onClick={checkAnswer}>
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

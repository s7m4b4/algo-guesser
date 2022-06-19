import * as React from 'react';
import { useEffect, useState } from 'react';
import { GameStateContextType } from '../@types/gamestate';
import { SettingsContextType } from '../@types/settings';
import MultipleChoice from '../components/MultipleChoice';
import { GameContext } from '../context/GameState';
import { SettingsContext } from '../context/Settings';
import { Question } from '../lib/question';
import QuestionBox from './QuestionBox';
import Spinner from './Spinner';

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

  useEffect(() => {
    setLoading(true);
    fetchQuestions();
    setLoading(false);
  }, []);

  if (isLoading || !question) return <Spinner />;

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
    <div className="flex items-center justify-between">
      <QuestionBox question={question} />

      <div className="flex flex-col p-4 space-y-4">
        <div className="flex flex-col space-y-1 text-center text-white">
          <span className="font-extrabold lg:text-3xl">How would you solve this?</span>
          <span className="text-xs italic font-semibold">(Select up to {question.topicTags.length})</span>
        </div>

        <div className="flex flex-col space-y-4">
          <MultipleChoice
            selected={answers}
            choices={choices}
            question={question}
            submitted={submitted}
            click={handleAnswers}
          />
          <button
            disabled={!answers.length || submitted}
            className="w-full py-2 font-semibold rounded-full bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            onClick={checkAnswer}
          >
            Check
          </button>
        </div>
        <div className="flex justify-end">
          <button
            disabled={!submitted}
            className="px-4 py-2 text-2xl text-blue-400 bg-white rounded-full disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            onClick={nextRound}
          >
            ➜
          </button>
        </div>
      </div>
    </div>
  );
}

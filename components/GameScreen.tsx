import { useEffect, useState } from "react";
import MultipleChoice from "../components/MultipleChoice";
import { Question } from "../lib/question";
import QuestionBox from "./QuestionBox";
import Spinner from "./Spinner";


export default function GameScreen() {
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [choices, setChoices] = useState<string[]>([])
  const [question, setQuestion] = useState<Question | null>(null)
  const [isLoading, setLoading] = useState(false)

  async function fetchQuestions() {
      const request = await fetch("api/question")
      const {question, choices} = await request.json()
      setQuestion(question)
      setChoices(choices)
  }

  useEffect(() => {
    setLoading(true)
    fetchQuestions()
    setLoading(false)
  }, [])

  if (isLoading || !question) return <Spinner /> 

  const handleAnswers = (answer: string) => {
    if (answers!.includes(answer)) {
      setAnswers(answers!.filter(item => item !== answer))
    }
    else {
      setAnswers(prevState => [...prevState, answer] );
    }
  }

  const checkAnswer = () => {
    setSubmitted(true)
    const correctAnswers = answers!.filter(value => question.topicTags.includes(value))
    if (correctAnswers.length > 0) {
      setScore(score + 1)
    }
  };

  const nextRound = () => {
    setQuestion(null)
    setAnswers([])
    setSubmitted(false)
    fetchQuestions()
  }

  return (
    <div className="flex items-center justify-between p-4">
      <QuestionBox question={question} />

      <div className="flex flex-col p-4 space-y-4">
        <div className="flex flex-col space-y-1 text-center text-white">
          <span className="text-3xl font-extrabold">How would you solve this?</span>
          <span className="text-xs italic font-semibold">(Select up to {question.topicTags.length})</span>
        </div>
        
        <div className="flex flex-col space-y-4">
          <MultipleChoice selected={answers} choices={choices} question={question} submitted={submitted} click={handleAnswers} />
          <button disabled={!answers.length || submitted} className="w-full py-2 font-semibold rounded-full bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed" onClick={checkAnswer}>Check</button>
        </div>
        <span className="absolute top-0 text-3xl font-black tracking-wide text-white right-20">Score: {score}</span>
      </div>

      <div className="w-1/12">
        {submitted &&
          <button className="px-4 py-5 text-4xl text-blue-400 bg-white rounded-full" onClick={nextRound}>
            ➜
          </button>
        }
      </div>
    </div>
  );
}

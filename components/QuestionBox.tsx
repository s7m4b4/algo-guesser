import { Question } from "../lib/question"
import Pill from "./Pill"

interface QuestionBoxProps {
    question: Question
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ question }) => {
  return (
    <div className="flex flex-col w-1/2 max-w-2xl max-h-screen px-8 py-4 overflow-y-auto rounded shadow-lg bg-gray-50">
      <div className="flex items-center justify-center pb-2 space-x-2 align-top border-b">
        <span className="text-xl font-bold">{question.title}</span>
        <Pill text={question.difficulty} />
      </div>
      <div className="text-xs unreset" dangerouslySetInnerHTML={ { __html: question.content} }></div>
    </div>
  )
}

export default QuestionBox
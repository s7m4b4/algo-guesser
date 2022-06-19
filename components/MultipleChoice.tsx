import { Question } from '../lib/question';

interface MultipleChoiceProps {
  click?: (choice: string) => void;
  choices: string[];
  selected: string[];
  question: Question;
  submitted: boolean;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ click, choices, selected, question, submitted }) => {
  const bgColour = {
    inactive: '',
    active: 'ring-4 ring-yellow-400'
  };

  const correctAnswers = (choice: string) => {
    if (!submitted) {
      return;
    }

    if (question.topicTags.includes(choice)) {
      return 'bg-green-500 text-white border-green-900';
    } else {
      return 'bg-red-500 text-white border-red-800';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {choices.map((choice: string) => (
        <button
          disabled={submitted || (selected.length >= question.topicTags.length && !selected.includes(choice))}
          className={`${selected.includes(choice) ? bgColour.active : bgColour.inactive}
           ${correctAnswers(choice)}
           relative bg-gray-50 sm:px-1 lg:px-4 py-1 rounded shadow-lg text-center text-xs lg:text-lg font-semibold break-words select-none transition duration-100 hover:cursor-pointer hover:bg-gray-50 disabled:pointer-events-none`}
          onClick={() => click?.(choice)}
          key={choice}
        >
          {choice}

          {submitted && question.topicTags.includes(choice) && selected.includes(choice) && (
            <span className="absolute w-6 h-6 text-green-400 align-middle bg-green-800 rounded-full -right-2 -top-2">
              ✔
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default MultipleChoice;

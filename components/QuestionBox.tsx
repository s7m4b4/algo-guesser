import { motion } from 'framer-motion';
import { Question } from '../lib/question';
import Pill from './Pill';
import * as React from 'react';
import { SettingsContext } from '../context/Settings';
import { SettingsContextType } from '../@types/settings';

type QuestionProps = { question: Question };

const QuestionBox: React.FC<QuestionProps> = ({ question }) => {
  const { showTitle, showDifficulty } = React.useContext(SettingsContext) as SettingsContextType;

  return (
    <motion.div
      className="flex flex-col max-w-2xl max-h-screen px-8 py-4 overflow-y-auto rounded shadow-xl bg-gray-50"
      initial={{ opacity: 0, y: '50%', scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duriation: 0.1, ease: 'easeOut' }}
      exit={{ opacity: 0, y: '50%' }}
    >
      <div className="flex items-center justify-center pb-2 space-x-2 align-top border-b">
        {showTitle && <span className="text-xl font-bold">{question.title}</span>}
        {showDifficulty && <Pill text={question.difficulty} />}
      </div>
      <div className="text-xs" dangerouslySetInnerHTML={{ __html: question.content }}></div>
    </motion.div>
  );
};

export default QuestionBox;

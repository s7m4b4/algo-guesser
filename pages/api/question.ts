import { Question, questions } from '../../lib/question';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Difficulty } from '../../types/settings';

const MAX_CHOICES = 10;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filteredQuestions: Question[] = [];
  const { difficulty } = req.query;

  if (difficulty != undefined) {
    questions.map((question) => {
      if (difficulty instanceof Array) {
        if (difficulty.includes(question.difficulty)) {
          filteredQuestions.push(question);
        }
      } else if (question.difficulty == (difficulty as Difficulty)) {
        filteredQuestions.push(question);
      }
    });
  }

  let question: Question;
  if (filteredQuestions.length > 0) {
    question = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
  } else {
    question = questions[Math.floor(Math.random() * questions.length)];
  }

  const choices = questions.reduce((acc, actual) => acc.concat(actual['topicTags']), [] as string[]);
  const length = question.topicTags.length;

  const t = [...new Set(choices.filter((item) => !question.topicTags.includes(item)))]
    .sort(() => 0.5 - Math.random())
    .slice(0, MAX_CHOICES - length);

  const response = {
    question: question,
    choices: question.topicTags.concat(t).sort(() => 0.5 - Math.random())
  };

  res.status(200).json(response);
}

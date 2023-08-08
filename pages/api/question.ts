import { difficultyOptions } from '../../components/Settings';
import { defaultTopics } from '../../constants';
import { Question, questions, topics } from '../../lib/question';
import type { NextApiRequest, NextApiResponse } from 'next';

const MAX_CHOICES = 10;

const splitQuery = (query: string | string[] | undefined) => {
  return typeof query === 'string' ? query.split(',') : [];
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const difficulityQuery = req.query.topics ? splitQuery(req.query.difficulty) : ['Easy', 'Medium', 'Hard'];
  const topicQuery = req.query.topics ? splitQuery(req.query.topics) : defaultTopics;

  const filteredQuestions = questions.filter(
    (question: Question) =>
      difficulityQuery.includes(question.difficulty) && question.topicTags.some((tag) => topicQuery.includes(tag))
  );

  const question = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];

  const availableTopics = topics.filter((topic) => !question.topicTags.includes(topic));
  const choices = availableTopics.sort(() => 0.5 - Math.random()).slice(0, MAX_CHOICES - question.topicTags.length);

  const response = {
    question: question,
    choices: [...question.topicTags, ...choices]
  };

  res.status(200).json(response);
}

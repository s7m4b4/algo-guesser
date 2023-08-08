export interface Question {
  title: string;
  titleSlug: string;
  content: string;
  difficulty: Difficulty;
  topicTags: string[];
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export const questions: Array<Question> = require('../data/questions.json') as Array<Question>;

export const topics: Array<string> = require('../data/topics.json');

export const categories = Array.from(new Set(questions.flatMap((question) => question.topicTags)));

export const totalQuestions = questions.length;

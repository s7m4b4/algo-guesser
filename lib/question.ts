export type Question = {
  title: string;
  titleSlug: string;
  content: string;
  difficulty: string;
  topicTags: string[];
};

export const questions: Question[] = require("../data/questions.json");

export interface Question {
  title: string;
  titleSlug: string;
  content: string;
  difficulty: Difficulty;
  topicTags: string[];
}

export type Difficulty = "Easy" | "Medium" | "Hard";

export const questions: Array<Question> =
  require("../data/questions.json") as Array<Question>;

export const categories = questions.reduce(
  (acc, question) => acc.concat(question["topicTags"]),
  [] as string[]
);

export const uniqueCats = (question: Question) => {
  categories.filter((item) => !question.topicTags.includes(item));
};

const unique = (question: Question, max: number) =>
  [...new Set()]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.max(0, max - question.topicTags.length));

export const totalQuestions = questions.length;

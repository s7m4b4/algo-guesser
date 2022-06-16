import { questions } from "../../lib/question";
import type { NextApiRequest, NextApiResponse } from "next";

const MAX_CHOICES = 10;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const question = questions[Math.floor(Math.random() * questions.length)];
  const choices = questions.reduce(
    (acc, actual) => acc.concat(actual["topicTags"]),
    [] as string[]
  );
  const length = question.topicTags.length;

  const t = [
    ...new Set(choices.filter((item) => !question.topicTags.includes(item))),
  ]
    .sort(() => 0.5 - Math.random())
    .slice(0, MAX_CHOICES - length);

  const response = {
    question: question,
    choices: question.topicTags.concat(t),
  };

  res.status(200).json(response);
}

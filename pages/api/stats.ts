import { categories, questions } from '../../lib/question';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = {
    total: {
      questions: questions.length,
      categories: [...new Set(categories)].length
    }
  };

  res.status(200).json(response);
}

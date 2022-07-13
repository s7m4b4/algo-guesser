const { writeFileSync } = require('fs');
const { request } = require('https');
const { join } = require('path');

const query = `query getQuestionDetail($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    title
    titleSlug
    content
    difficulty
    topicTags {
      name
    }
  }
}
`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function saveData(data) {
  try {
    const dir = join(__dirname, '../data/', 'questions.json');
    writeFileSync(dir, JSON.stringify(data, null, 4));
    console.log(`Saved to ${dir}`);
  } catch (err) {
    console.error(err);
  }
}

const httprequest = ({ options, payload }) => {
  return new Promise((resolve, reject) => {
    const req = request(options, (res) => {
      var body = [];

      res.on('data', (chunk) => {
        body.push(chunk);
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(Buffer.concat(body).toString());
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', (err) => {
      reject(err.message);
    });

    if (payload) req.write(payload);

    req.end();
  });
};

async function getQuestionList() {
  const response = await httprequest({
    options: {
      method: 'GET',
      host: 'leetcode.com',
      path: '/api/problems/algorithms/',
      port: 443,
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com/'
      }
    }
  });

  // remove preimum questions
  const results = response.stat_status_pairs.reduce(
    (acc, question) => (!question.paid_only ? [...acc, question.stat.question__title_slug] : acc),
    []
  );

  return results;
}

async function getQuestionDetail(questions) {
  const results = await Promise.all(
    questions.map(async (title, i) => {
      // prevent firing off all requests at once
      await sleep(2000 * i);

      console.log(`#${i + 1} - Collecting ${title}...`);

      const response = await httprequest({
        options: {
          method: 'POST',
          host: 'leetcode.com',
          path: '/graphql',
          port: 443,
          headers: {
            'Content-Type': 'application/json',
            Referer: 'https://leetcode.com/'
          }
        },
        payload: JSON.stringify({
          query: query,
          variables: { titleSlug: title }
        })
      });

      const question = response.data.question;
      if (question.topicTags.length) {
        const data = {
          title: question.title,
          content: question.content.replaceAll(/<img .*?>/g, ''), // remove img tags avoid hotlinking
          difficulty: question.difficulty,
          topicTags: question.topicTags.map((topic) => topic['name']),
          titleSlug: question.titleSlug
        };

        return data;
      } else {
        console.error(`${q} has no topic tags, skipping.`);
      }
    })
  );
  return results;
}

(async function main() {
  const questions = await getQuestionList();
  const results = await getQuestionDetail(questions);
  saveData(results);
})();

const fs = require('fs');
const { saveData } = require('./common');

fs.readFile('../data/questions.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let questions = JSON.parse(data);
  const topics = questions.reduce((acc, actual) => acc.concat(actual['topicTags']), []);
  const uniqueTopics = [...new Set(topics)];

  saveData(uniqueTopics, 'topics.json');
});

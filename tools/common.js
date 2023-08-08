const { writeFileSync } = require('fs');
const { join } = require('path');

function saveData(data, fileName) {
  try {
    const dir = join(__dirname, '../data/', fileName);
    writeFileSync(dir, JSON.stringify(data, null, 0));
    console.log(`Saved to ${dir}`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  saveData
};

const path = require('path');
const fs = require('fs');

module.exports = {
  getSeedDataFile(filename) {
    const filePath = path.join(__dirname, 'seed-data', filename);
    return fs.readFileSync(filePath, 'utf8');
  },
  getRefByProp(arr, prop, value) {
    return arr.find((obj) => obj[prop] === value)._id;
  },
  getRefsByProp(arr, prop, values) {
    return arr
      .filter((obj) => values.includes(obj[prop]))
      .map((obj) => obj._id);
  },
  getDateWithOffset(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  },
};

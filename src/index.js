const details = require('./details');
const search = require('./search');
const utils = require('./utils');

module.exports = {
  ...details,
  ...search,
  ...utils,
};

const path = require('path');
const jsonFile = require('jsonfile');
module.exports = jsonFile.readFileSync(path.join(__dirname, './userServerUrlMapping.json'));

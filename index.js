const launcher = require('./src/karma-cbt-launcher');
const reporter = require('./src/reporter');

module.exports = { 
    'reporter:CrossBrowserTesting': ['type', reporter],
    'launcher:CrossBrowserTesting': ['factory', launcher]
};

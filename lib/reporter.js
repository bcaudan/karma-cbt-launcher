'use strict';

var request = require('request');
var cbtTunnel = require('./tunnel');
var session = require('./session');

var api = 'https://crossbrowsertesting.com/api/v3/selenium/';

function CbtReporter(logger) {
    var log = logger.create('cbt-reporter');

    function markTest(score, testId) {
        var options = {
            method: 'PUT',
            uri: api + testId,
            json: {
                'selenium_test_id': testId,
                'format': 'json',
                'action': 'set_score',
                'score': score
            },
            auth: {
                username: cbtTunnel.username,
                password: cbtTunnel.authkey
            }
        };

        // TODO: handle failures here
        request(options);
    }

    function setDescription(description, testId) {
        var options = {
            method: 'PUT',
            uri: api + testId,
            json: {
                'selenium_test_id': testId,
                'format': 'json',
                'action': 'set_description',
                'description': description
            },
            auth: {
                username: cbtTunnel.username,
                password: cbtTunnel.authkey
            }
        };

        // TODO: handle failures here
        request(options);
    }

    this.onBrowserComplete = function (browser) {
        var res = browser.lastResult;
        var score = res.failed ? 'fail' : 'pass';
        var seleniumId = session.activeSessions[browser.id];
        log.info('marking test [' + seleniumId + '] as ' + score + 'ed on CBT');
        markTest(score, seleniumId);
        var description = res.success + ' test(s) passed, ' + res.failed + ' test(s) failed';
        setDescription(description, seleniumId);
    };
}

module.exports = CbtReporter;
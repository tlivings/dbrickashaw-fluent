'use strict';

import Test from 'tape';
import Flogger from '..';
import Dshaw from 'dbrickashaw';

Test('test', function (t) {

    t.test('plan', function (t) {
        Flogger.init('testapp', '1.0.0');

        //Remove publisher
        Flogger.removeAllListeners('log');

        Flogger.on('log', function (source, data, time) {
            t.strictEqual(source, 'flogger', 'source is correct.');
            t.ok(typeof data === 'object', 'data is object.');
            t.strictEqual(data.action, 'submit', 'action is correct.');
            t.strictEqual(data.user, 'testuser', 'user is correct.');
            t.ok(Array.isArray(data.tags), 'tags is an array.');
            t.ok(data.tags.indexOf('login') > -1, 'tags contains login.');
            t.ok(data.tags.indexOf('ab') > -1, 'tags contains ab.');
            t.ok(data.tags.indexOf('debug') > -1, 'tags contains debug.');
            t.end();

            // setTimeout(function () {
            //     process.exit();
            // }, 3000);
        });

        let logger = Dshaw.createLogger();

        logger.debug(['login', 'ab'], {
            action: 'submit',
            user: 'testuser'
        });
    });

});

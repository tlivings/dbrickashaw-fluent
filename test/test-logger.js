'use strict';

import Test from 'tape';
import FluentLogger from '..';
import Dshaw from 'dbrickashaw';
import Pkg from '../package.json';
import Path from 'path';

Test.only('dbrickashaw-fluent', function (t) {

    t.test('log', function (t) {
        FluentLogger.init({
            name: 'testapp',
            version: '1.0.0'
        });

        //Remove publisher
        FluentLogger.removeAllListeners('log');

        FluentLogger.on('log', function (source, data, time) {
            t.strictEqual(source, 'dbrickashaw-fluent', 'source is correct.');
            t.ok(typeof data === 'object', 'data is object.');
            t.strictEqual(data.version, '1.0.0', 'version is correct.');
            t.strictEqual(data.source, Pkg.name + '@' + Pkg.version + ':' + Path.relative(process.cwd(), __filename), 'version is correct.');
            t.strictEqual(data.action, 'submit', 'action is correct.');
            t.strictEqual(data.user, 'testuser', 'user is correct.');
            t.ok(Array.isArray(data.tags), 'tags is an array.');
            t.ok(data.tags.indexOf('login') > -1, 'tags contains login.');
            t.ok(data.tags.indexOf('ab') > -1, 'tags contains ab.');
            t.ok(data.tags.indexOf('debug') > -1, 'tags contains debug.');
            t.end();
        });

        let logger = Dshaw.createLogger();

        logger.debug(['login', 'ab'], {
            action: 'submit',
            user: 'testuser'
        });
    });

});

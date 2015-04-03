'use strict';

import Dshaw from 'dbrickashaw';
import FluentLogger from 'fluent-logger';
import Util from 'util';
import Callermodule from 'callermodule';
import {EventEmitter} from 'events';

//Copied from dbrickashaw
const LEVELS = ['silly', 'debug', 'verbose', 'info', 'warn', 'error'];

const publisher = Dshaw.getPublisher();

export default Object.assign(new EventEmitter(), {

    init({host = 'localhost', port = 24224, timeout = 3.0, name, version} = {}) {
        var caller = Callermodule();
        var self = this;

        FluentLogger.configure(name || caller.name, {
            host: host,
            port: port,
            timeout: timeout,
            milliseconds: false
        });

        let log = ({source, ts, tags, data}) => {
            if (typeof data === 'string') {
                data = {
                    message: data
                };
            }

            let payload = Util._extend(data, {
                version: version || caller.version,
                source: source.name,
                tags: Array.isArray(tags) ? tags : []
            });

            for (let i = 0; i < LEVELS.length; i++) {
                let level = LEVELS[i];

                if (tags.indexOf(level) > -1) {
                    payload.level = level;
                    break;
                }
            }

            self.emit('log', source.module, payload, ts/1000);
        };

        let fluentlog = (source, data, time) => {
            FluentLogger.emit(source, data, time);
        };

        publisher.removeListener('log', log);
        publisher.on('log', log);
        self.removeListener('log', fluentlog);
        self.on('log', fluentlog);
    }
});

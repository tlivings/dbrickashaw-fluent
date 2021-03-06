# dbrickashaw-fluent

`dbrickashaw-fluent` is a publisher for [dbrickashaw](https://github.com/totherik/dbrickashaw) `log` events.

### Configuration

```javascript
import FluentLogger from 'dbrickashaw-fluent';

FluentLogger.init(/*options*/);
```

Supported options:

- `host` - td-agent host, defaults to `localhost`.
- `port` - td-agent port, defaults to `24224`.
- `timeout` - td-agent timeout, defaults to `3.0` seconds.

and in optionally:

- `name` - appname override, defaults to `init()` caller's name.
- `version` - version override of caller.

### Example

```javascript
//the app
import FluentLogger from 'dbrickashaw-fluent';

FluentLogger.init();
```

```javascript
//a module or library
import Dshaw from 'dbrickashaw';

let logger = Dshaw.createLogger();

logger.info(['login', 'ab'], {
    action: 'submit',
    user: 'testuser'
});
```

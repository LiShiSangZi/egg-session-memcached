# egg-session-memcached

Session extension for store the session data in memcached.

## Install
```
$ npm i egg-session-memcached --save
```

## Usage
```javascript
// {app_root}/app.js
// If you want to use session in your middleware. You need to add it after session middleware.
const index = app.config.coreMiddleware.indexOf('session');
if (index >= 0) {
  app.config.coreMiddleware.splice(index + 1, 0, MyMiddleware);
}
```

```javascript
// {app_root}/config/plugin.js
exports['session-memcached'] = {
  enable: true,
  package: 'egg-session-memcached'
};
```

## Configuration
```javascript
// {app_root}/config/config.default.js 
exports['session-memcached'] = {
  client: {
    host: `${YOUR_MEMCACHED_HOST}`,
    port: `${YOUR_MEMCACHED_PORT}`,
    failOverServers: [] // Your memcached fail over servers. Including the port and host.
  }
};
```

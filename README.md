# egg-session-memcached

Session extension for store the session data in memcached.

## Install
```
$ npm i egg-session-memcached --save
```

## Usage
```javascript
// {app_root}/config/plugin.js
exports.memcached = {
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

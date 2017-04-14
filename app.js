'use strict';

const Memcached = require('memcached');
const DEFAULT_MAX_AGE = 1000 * 60 * 60 * 24;

module.exports = app => {
  app.addSingleton('session-memcached', createMemcached);
}

function createMemcached(config, app) {
  const memcached = new Memcached(`${config.host}:${config.port || '11211'}`, {
    retries: 10,
    retry: 10000,
    remove: true,
    failOverServers: config.failOverServers || []
  });
  app.beforeStart(async() => {

    app.sessionStore = {
      async get(key) {
        return new Promise((resolve, reject) => {
          memcached.get(key, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      },

      async set(key, sess, maxAge) {
        return new Promise((resolve, reject) => {
          const age = maxAge || DEFAULT_MAX_AGE;
          memcached.set(key, sess, maxAge / 1000, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      },

      async destroy(key) {
        return new Promise((resolve, reject) => {
          memcached.del(key, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      },
    };
  });

  return memcached;
}

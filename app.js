'use strict';

const Memcached = require('memcached');
const DEFAULT_MAX_AGE = 1000 * 60 * 60 * 24;

module.exports = app => {
  const memcached = new Memcached('10.0.101.54:11211', {
    retries: 10,
    retry: 10000,
    remove: true,
    failOverServers: ['10.0.101.54:11211']
  });

  const name = app.config.sessionMem.name;
  const memcached = name ? app.memcached.get(name) : app.memcached;

  app.sessionStore = {
    async get(key) {
      return new Promise((resolve, reject) => {
        this.memcached.get(key, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    },

    async set(key, value, maxAge) {
      return new Promise((resolve, reject) => {
        this.memcached.get(key, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    },

    async destroy(key) {
      return new Promise((resolve, reject) => {
        this.memcached.del(key, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    },
  };
}

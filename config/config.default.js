'use strict';

/**
 * session-redis default config
 * @member Config#sessionRedis
 * @property {String} name - redis instance name
 */
exports.sessionMem = {
  name: '', // if name present, use `app.memcachd[name]` for session store
};

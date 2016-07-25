'use strict';

var crypto = require('crypto');

module.exports = function pkgHash(data, deps) {
  data = data || '';
  deps = deps || {};
  Object.keys(deps).forEach(function (dep) {
    data += '/' + dep + '@' + deps[dep];
  });

  return crypto.createHash('md5').update(data).digest('hex');
};

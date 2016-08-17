'use strict';

var crypto = require('crypto');
var browserify = require('browserify');
var path = require('path');

module.exports = function pkgHash(rootPath, done) {
  var pkg = require(path.join(rootPath, 'package.json'));
  var entry = path.resolve(rootPath, pkg.main);
  browserify({ bundleExternal: false })
    .add(entry)
    .bundle(function (err, buf) {
      if (err) {
        done(err);
      } else {
        done(null, crypto.createHash('md5').update(buf).digest('hex'));
      }
    });
};

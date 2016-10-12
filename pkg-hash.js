'use strict';

var crypto = require('crypto');
var detective = require('detective');
var async = require('async');
var fs = require('fs');
var path = require('path');

var LOCAL = /^(\.|\/)/;

module.exports = function pkgHash(rootPath, done) {
  var pkg = require(path.join(rootPath, 'package.json'));
  var entry = path.join(rootPath, pkg.main);
  fs.readFile(entry, 'utf8', function (err, src) {
    if (err) {
      done(err);
    } else {
      var basepath = entry.substr(0, entry.length - path.basename(entry).length);
      var tasks = detective(src)
        .filter(function (moduleName) {
          return LOCAL.exec(moduleName);
        })
        .map(function (moduleName) {
          return function (cb) {
            fs.readFile(require.resolve(path.join(basepath, moduleName)), 'utf8', cb);
          };
        });

      async.parallel(tasks, function (err, results) {
        if (err) {
          done(err);
        } else {
          results.forEach(function (localSrc) {
            src += localSrc;
          });
          done(null, crypto.createHash('md5').update(src).digest('hex'));
        }
      });
    }
  });
};

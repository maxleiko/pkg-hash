'use strict';

var crypto = require('crypto');
var semver = require('semver');
var packageJson = require('package-json');
var async = require('async');

module.exports = function pkgHash(data, deps, callback) {
  data = data || '';
  deps = deps || {};
  async.parallel(
    Object.keys(deps)
      .map(function (dep) {
        return function (done) {
          if (semver.validRange(deps[dep])) {
            packageJson(dep, deps[dep])
              .then(function (json) {
                done(null, json);
              })
              .catch(function (err) {
                err.message += ' ('+dep + '@' + deps[dep]+')';
                done(err);
              });
          } else {
            packageJson(dep)
              .then(function (json) {
                packageJson(dep, json['dist-tags'][deps[dep]])
                  .then(function (json) {
                    done(null, json);
                  })
                  .catch(function (err) {
                    err.message += ' ('+dep + '@' + json[deps[dep]]+')';
                    done(err);
                  });
              })
              .catch(function (err) {
                err.message += ' ('+dep + '@' + deps[dep]+')';
                done(err);
              });
          }
        };
      }),
    function (err, results) {
      if (err) {
        callback(err);
      } else {
        results.forEach(function (json) {
          data += '/' + json.dist.shasum;
        });
        callback(null, crypto.createHash('md5').update(data).digest('hex'));
      }
    }
  );
};

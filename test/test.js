'use strict';

var expect = require('expect');
var pkgHash = require('../pkg-hash');

var pkg = require('../package.json');

describe('pkg-hash tests', function () {

  var hash;

  beforeEach('should generate the base hash', function (done) {
    pkgHash(pkg.name, pkg.dependencies, function (err, hashVal) {
      hash = hashVal;
      done(err);
    });
  });

  it('should generate an alternative hash', function (done) {
    pkgHash(pkg.name + '/' + pkg.version, pkg.dependencies, function (err, hashVal) {
      expect(hashVal).toNotEqual(hash);
      done(err);
    });
  });
});

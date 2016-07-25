'use strict';

var expect = require('expect');
var pkgHash = require('../pkg-hash');

describe('pkg-hash tests', function () {
  it('should generate different hashes when changes', function () {
    var hash0 = pkgHash('foo', { bar: '1.2.3' });
    var hash1 = pkgHash('foo', { bar: '^1.2.3' });
    expect(hash1).toNotEqual(hash0);
  });

  it('should generate the same hash if no changes', function () {
    var hash0 = pkgHash('foo', { bar: '1.2.3' });
    var hash1 = pkgHash('foo', { bar: '1.2.3' });
    expect(hash1).toEqual(hash0);
  });

  it('should work with weird params', function () {
    var hash = pkgHash();
    expect(typeof hash).toEqual('string');
    expect(hash.length).toEqual(32);
  });
});

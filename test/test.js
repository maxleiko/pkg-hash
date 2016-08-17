'use strict';

const path = require('path');
const expect = require('expect');
const pkgHash = require('../pkg-hash');

describe('pkg-hash tests', () => {
  it('should generate the same hashes for the same modules', done => {
    pkgHash(path.join(__dirname, '..'), (err, hash1) => {
      if (err) {
        done(err);
      } else {
        pkgHash(path.join(__dirname, '..'), (err, hash2) => {
          if (err) {
            done(err);
          } else {
            expect(hash2).toEqual(hash1);
            done();
          }
        });
      }
    });
  });

  it('should generate different hashes for different modules', done => {
    pkgHash(path.join(__dirname, 'fixtures', 'module0'), (err, hash1) => {
      if (err) {
        done(err);
      } else {
        pkgHash(path.join(__dirname, 'fixtures', 'module1'), (err, hash2) => {
          if (err) {
            done(err);
          } else {
            expect(hash2).toNotEqual(hash1);
            done();
          }
        });
      }
    });
  });
});

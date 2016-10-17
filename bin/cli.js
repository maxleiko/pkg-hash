#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var pkgHash = require('../pkg-hash');

var PKGPATH = path.join(process.cwd(), 'package.json');

fs.readFile(PKGPATH, function (err, data) {
  if (err) {
    throw new Error('Unable to find "package.json" in current directory (%s)', process.cwd());
  } else {
    var pkg = JSON.parse(data);
    pkgHash(process.cwd(), function (err, hash) {
      if (err) {
        throw err;
      } else {
        console.log('Name: %s', pkg.name);
        console.log('Vers: %s', pkg.version);
        console.log('Hash: %s', hash);
      }
    });
  }
});

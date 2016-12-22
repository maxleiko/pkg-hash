var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var detective = require('detective');
var resolve = require('resolve');

var LOCAL = /^(\.|\/)/;

module.exports = function pkgHash(modulePath) {
	var readFiles = {};

	function getLocalRequires(srcPath) {
		var hashes = [];

		if (!readFiles[srcPath]) {
			// process file
			var src = fs.readFileSync(srcPath, 'utf8');
			var hash = crypto.createHash('md5').update(src).digest('hex');
			hashes.push({
				path: srcPath,
				hash: hash
			});
			readFiles[srcPath] = true;

			detective(src)
				.filter(function (r) {
					return LOCAL.exec(r);
				}).map(function (r) {
					return resolve.sync(r, {
						basedir: path.dirname(srcPath)
					});
				}).filter(function (r) {
					return !readFiles[r];
				}).forEach(function (r) {
					hashes = hashes.concat(getLocalRequires(r));
				});
		}

		return hashes;
	}

	var pkgPath = path.join(modulePath, 'package.json');
	var pkgSrc = fs.readFileSync(pkgPath, 'utf8');
	var pkg = JSON.parse(pkgSrc);
	var entryFile = path.resolve(modulePath, pkg.main);
	var requires = getLocalRequires(entryFile);

	var hash = '';
	for (var i = 0; i < requires.length; i++) {
		hash = crypto.createHash('md5').update(hash + requires[i].hash).digest('hex');
	}

	return hash;
};

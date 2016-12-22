'use strict';

const path = require('path');
const assert = require('assert');
const pkgHash = require('../pkg-hash');

// TODO do proper testing this sucks

describe('pkg-hash tests', () => {
	it('should generate the same hashes for the same modules', () => {
		const hash1 = pkgHash(path.join('test', '..'));
		const hash2 = pkgHash(path.join('test', '..'));
		assert.equal(hash2, hash1);
	});

	it('should generate different hashes for different modules', () => {
		const hash1 = pkgHash(path.join('test', 'fixtures', 'module0'));
		const hash2 = pkgHash(path.join('test', 'fixtures', 'module1'));
		assert.notEqual(hash2, hash1);
	});

	it('should use all local files to generate the hash', () => {
		const hash = pkgHash(path.join('test', 'fixtures', 'module2'));
		assert.ok(hash);
	});

	it('should work with weird file extensions', () => {
		const hash = pkgHash(path.join('test', 'fixtures', 'module3'));
		assert.ok(hash);
	});

	it('should generate different hashes for modules that produce the same output but using local & npm-insalled modules', () => {
		const hash1 = pkgHash(path.join('test', 'fixtures', 'module4'));
		const hash2 = pkgHash(path.join('test', 'fixtures', 'module5'));
		assert.notEqual(hash1, hash2);
	});
});

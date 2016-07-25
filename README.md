### pkg-hash

Generates an MD5 hash based on given params.  
This package expects the `deps` param to be a map of `module:semver|tag`.  
The hash will be created by following this pattern:
```
// pseudo code
md5(data + '/' + key0 + '@' deps[key0] + '/' + key1 + '@' deps[key1] + ...)
```

### API
```
pkgHash(data, deps): hash
```
 - **data**: [string] will be used as the base string for the hash *(can be null or undefined)*  
 - **deps**: [object] a `package.json` dependencies map  
   *ie.:*
   ```js
   const deps = {
     'async': '^2',
     'q': '>1.0.0'
   };
   ```

**Returns**
 - **hash**: [string] MD5 hash

### Usage
```js
const pkgHash = require('pkg-hash');

const hash = pkgHash('foo', { bar: '^1.2.3' });

// Typically you would use package.json data:
// const pkg = require('/path/to/a/package.json');
// const hash = pkgHash(pkg.name + '/' + pkg.version, pkg.dependencies);
```

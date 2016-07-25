### package-hash

```js
var pkgHash = require('package-hash');
var pkg = require('./package.json'); // require a package.json somewhere

pkgHash(
  pkg.name + '/' + pkg.version,
  pkg.dependencies,
  function (err, hash) {
    if (err) {
      // unable to generate hash
      throw err;
    } else {
      // hash generated
      // ie. 2505ca9395730ce5d70e977d7922d95c
      // based on pkg.name + '/' + pkg.version
      // plus each dependency shasum separated by '/'
    }
  }
);
```

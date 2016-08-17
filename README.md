### pkg-hash

Generates an MD5 hash of a CommonJS module using Browserify to bundle **only**
the local files, starting with the main field in `package.json`.  

### API
```
pkgHash(modulePath, callback): undefined
```
 - **modulePath**:&nbsp;[string]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will be used as the root path for Browserify to bundle the module
 - **callback**:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[function]&nbsp;&nbsp;will be called when done `function (err: Error, hash: String)`

### Usage
```js
import pkgHash from 'pkg-hash';

pkgHash('/path/to/a/module', (err, hash) => {
  if (err) {
    // something went wrong
    throw err;
  } else {
    // all good
    console.log('Hash: ' + hash);
  }
});
```

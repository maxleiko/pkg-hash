### pkg-hash

Generates an MD5 hash of a CommonJS module using `detective` (JavaScript Acorn parser) to bundle **only**
the local files, starting with the main field in `package.json`.  

### Example
You have a module `package.json` that looks like this:
```json
{
  "name": "my-module",
  "version": "1.2.3",
  "main": "index.js",
  "dependencies": {
    "async": "^2.0.0"
  }
}
```

And the `index.js` file:
```js
// you use a local file in your index.js because you can :)
const myLocalLib = require('./lib/myLocalLib');
// but you also use Node.js std libs or npm installed modules
const fs = require('fs');
const path = require('path');
const async = require('async');

// and you do whatever in your module
// blabla
```

Now what `pkg-hash` gives you is the ability to concatenate **only** local required files and hash the whole string into an **MD5** hash.  
Which means that if you point out the folder in your `my-module` is, you will have a resulting MD5 hash of the concatenation of `index.js` and `./lib/myLocalLib.js`

```js
// in some other file, let's say hasher.js in your module root folder
const pkgHash = require('pkg-hash');

pkgHash(__dirname, function (err, hash) {
  if (err) {
    throw err;
  } else {
    // the hash result
  }
});
```


### API
```
pkgHash(modulePath, callback): undefined
```
 - **modulePath**:&nbsp;[string]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path to the module you want to get an hash from
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

### Purpose
The purpose of `pkg-hash` is to make integrity checks between different installation of an npm module. I know that npm already gives a hash of your module when you install it, but it does not take source code into account.  
[Kevoree](http://kevoree.org) needs to be able to check whether or not a change in the code source has happen. So here it is.

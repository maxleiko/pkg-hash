### pkg-hash

Generates an MD5 hash of a CommonJS module using `detective` (JavaScript Acorn parser) to get a list of all the `require's` and hash **only**
the local sources, starting with the "main" field in `package.json`.  

### Example
```js
const pkgHash = require('pkg-hash');

const hash = pkgHash('/path/to/a/commonjs/module');
console.log('Hash:', hash);
```

### Purpose
The purpose of `pkg-hash` is to make integrity checks between different versions/installations of an npm module.  
I know that npm already gives a hash of your module when you install it, but it does not take source code into account.  
[Kevoree](http://kevoree.org) needs to be able to check whether or not a change in the source code has happen in order to update or not a module.  
Well, here it is.

### Related

[pkg-hash-cli](https://github.com/maxleiko/pkg-hash-cli)

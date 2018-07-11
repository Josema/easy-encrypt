Easy encryption on top of the native nodejs crypto library

# Install

`npm i easyencryption`

# AES-256-CTR

```js
const { encrypt, decrypt } = require('easyencryption/aes256ctr')
const hw = encrypt('hello world', 'mys3cr3t')
console.log(decrypt(hw, 'mys3cr3t')) // 'hello world'
```

If you don't want to pass the password on each call:

```js
const { create } = require('easyencryption/aes256ctr')
const { encrypt, decrypt } = create('mys3cr3t')
const hw = encrypt('hello world')
console.log(decrypt(hw)) // 'hello world'
```

# To do

-   Add rollup
-   Tests
-   Buffer and Streams
-   AES-128-CTR

const crypto = require('crypto')
const separator = 'g'
const algorithm = 'AES-256-CTR'

function encrypt(secret, plaintext) {
    var iv = crypto.randomBytes(16), //128 bits
        salt = crypto.randomBytes(128),
        key = crypto.pbkdf2Sync(secret, salt, 8192, 32, 'sha1') //prevent dictionary attacks by salting/hashing the secret so the resulting cipher text is different each time even though the same secret is used

    var cipher = crypto.createCipheriv(algorithm, key, iv)
    cipher.write(plaintext, 'utf8')
    cipher.end()

    var ciphertext = cipher.read()

    return (
        iv.toString('hex') +
        separator +
        salt.toString('hex') +
        separator +
        ciphertext.toString('hex')
    )
}

function decrypt(secret, ciphertext) {
    var parts = ciphertext.split(separator)

    if (parts.length !== 3) {
        throw new Error('Format of cipher text is not supported.')
    }

    var iv = new Buffer(parts[0], 'hex'),
        salt = new Buffer(parts[1], 'hex'),
        key = crypto.pbkdf2Sync(secret, salt, 8192, 32, 'sha1')

    var decipher = crypto.createDecipheriv(algorithm, key, iv)
    decipher.write(parts[2], 'hex')
    decipher.end()
    return decipher.read().toString('utf8')
}

var ciphertext = encrypt('password', 'This message is TOP secret!!!')
var plaintext = decrypt('password', ciphertext)

console.log(ciphertext) //outputs: "<iv>$<salt>$<ciphertext>"
console.log(plaintext) //outputs: "This message is TOP secret!!!"

// var Cipher = require('easy-encryption')

// var ciphertext = Cipher.encrypt('password', 'This message is TOP secret!!!')
// var plaintext = Cipher.decrypt('password', ciphertext)

// console.log(ciphertext) //outputs: "<iv>$<salt>$<ciphertext>"
// console.log(plaintext) //outputs: "This message is TOP secret!!!"

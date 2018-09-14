const crypto = require('crypto')
const SEPARATOR = 'g'

function encrypt({
    text,
    password,
    algorithm,
    separator = SEPARATOR,
    iv = 16,
    salt = 128,
    iterations = 8192,
    pbkdbytes = 32
}) {
    const _iv = crypto.randomBytes(iv) //128 bits
    const _salt = crypto.randomBytes(salt)
    const _key = crypto.pbkdf2Sync(
        password,
        _salt,
        iterations,
        pbkdbytes,
        'sha1'
    ) //prevent dictionary attacks by _salting/hashing the password so the resulting cipher text is different each time even though the same password is used
    const cipher = crypto.createCipheriv(algorithm, _key, _iv)
    cipher.write(text, 'utf8')
    cipher.end()

    const ciphertext = cipher.read()

    return (
        _iv.toString('hex') +
        separator +
        _salt.toString('hex') +
        separator +
        ciphertext.toString('hex')
    )
}

function decrypt({
    text,
    password,
    algorithm,
    separator = SEPARATOR,
    iterations = 8192,
    pbkdbytes = 32
}) {
    const parts = text.split(separator)

    if (parts.length !== 3) {
        throw new Error('Format of cipher text is not supported.')
    }

    const iv = new Buffer(parts[0], 'hex'),
        salt = new Buffer(parts[1], 'hex'),
        key = crypto.pbkdf2Sync(password, salt, iterations, pbkdbytes, 'sha1')

    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    decipher.write(parts[2], 'hex')
    decipher.end()
    return decipher.read().toString('utf8')
}

module.exports = {
    encrypt,
    decrypt
}

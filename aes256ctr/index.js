// https://stackoverflow.com/questions/1220751/how-to-choose-an-aes-encryption-mode-cbc-ecb-ctr-ocb-cfb
// https://lollyrock.com/articles/nodejs-encryption/
const crypto = require('crypto')
const algorithm = 'aes-256-ctr'

function encrypt(text, password) {
    const type = typeof text
    if (text !== null && type === 'object') text = JSON.stringify(text)
    if (type !== 'string') text = String(text)
    const cipher = crypto.createCipher(algorithm, password)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
}

function decrypt(text, password) {
    const decipher = crypto.createDecipher(algorithm, password)
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return dec
}

function create(password) {
    return {
        encrypt: text => encrypt(text, password),
        decrypt: text => decrypt(text, password)
    }
}

exports.encrypt = encrypt
exports.decrypt = decrypt
exports.create = create

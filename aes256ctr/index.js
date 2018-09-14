// https://stackoverflow.com/questions/1220751/how-to-choose-an-aes-encryption-mode-cbc-ecb-ctr-ocb-cfb
// https://lollyrock.com/articles/nodejs-encryption/
const main = require('../index')
const algorithm = 'AES-256-CTR'

function encrypt(text, password) {
    return main.encrypt({ text, password, algorithm })
}

function decrypt(text, password) {
    return main.decrypt({ text, password, algorithm })
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

const test = require('ava')
const { encrypt, decrypt, create } = require('../aes256ctr/')

const PASSWORD = 'my_PASSWORD'

test('encrypt decrypt', async t => {
    const text = 'hello world'
    t.is(decrypt(encrypt(text, PASSWORD), PASSWORD), text)
})

test('create', async t => {
    const { encrypt, decrypt } = create(PASSWORD)
    const text = 'hello world'
    t.is(decrypt(encrypt(text)), text)
})

test('Invalid password', async t => {
    const text = 'hello world'
    t.not(decrypt(encrypt(text, PASSWORD), 'PASSWORD'), text)
})

test('Number', async t => {
    const value = 1234
    t.is(decrypt(encrypt(value, PASSWORD), PASSWORD), String(value))
})

test('Boolean', async t => {
    const value = true
    t.is(decrypt(encrypt(value, PASSWORD), PASSWORD), String(value))
})

test('Object', async t => {
    const value = { hello: 'world' }
    t.is(decrypt(encrypt(value, PASSWORD), PASSWORD), JSON.stringify(value))
})


const crypto = require('crypto')


async function createSalt(){

    const buf = await crypto.randomBytes(64)

    return buf
}

async function createHashedPassword(plain){

    const salt = await createSalt()
    const encrypt = crypto.pbkdf2Sync(plain, salt, 9999, 64, 'sha512', (err, key)=>{
        if(error) console.log(error)

        let encptPassword = await key.toString('base64')
        return encptPassword
    })
    console.log(encrypt)

    // return 값은 salt와 encrypt 값을 담은 object로
}

module.exports ={
    createSalt,
    createHashedPassword
}
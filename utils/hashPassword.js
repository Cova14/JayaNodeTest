const bcrypt = require('bcrypt-nodejs')

const genSalt = () => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                reject(err)
            } else {
                resolve(salt)
            }
        })
    })
}

const genHash = (salt, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, null, function(err, hash) {
            if (err) {
                reject(err)
            } else {
                resolve(hash)
            }
        })
    })
}

const hashPassword = async password => {
    try {
        const salt = await genSalt()
        const hash = await genHash(salt, password)
        return hash
    } catch (error) {
        console.log("Unable to hash password")
        return null
    }
}

module.exports = hashPassword
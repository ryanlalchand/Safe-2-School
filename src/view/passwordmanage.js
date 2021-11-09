//manager for passwords for database
// crypto module
const crypto = require("crypto");

//password stuff
//work via magic of cryptography

class pwManage {
    async passSet(password) {
        return new Promise((resolve, reject) => {
            // generate random 16 bytes long salt
            const salt = crypto.randomBytes(16).toString("hex")

            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(salt + ":" + derivedKey.toString('hex'))
            });
        })
    };



    async validPassword(password, hash) {
        return new Promise((resolve, reject) => {
            const [salt, key] = hash.split(":")
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(key == derivedKey.toString('hex'))
            });
        })
    };


}
module.exports = pwManage;
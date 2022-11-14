const crypto = require('crypto');
const argon2 = require('argon2');

 
const hashingConfig = { // based on OWASP cheat sheet recommendations (as of March, 2022)
    parallelism: 1,
    memoryCost: 64000, // 64 mb
    timeCost: 3 // number of iterations
}

const hashPassword = async function (password) {
  let salt = crypto.randomBytes(16).toString('hex');
  console.log(salt);
  const encryptedPass = await argon2.hash(password)

  return {
    iv: salt,
    password: encryptedPass
    }
} 
 
const verifyArg2pw = async function (hashedPW, password) {
    return argon2.verify(hashedPW, password);
}
// hashPassword("somePassword").then(async (hash) => {
//     console.log("Hash + salt of the password:", hash)
//     console.log("Password verification success:", await verifyPasswordWithHash("somePassword", hash));
// });

module.exports = { hashPassword, verifyArg2pw, hashingConfig }
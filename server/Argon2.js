const crypto = require('crypto')
const argon2 = require('argon2')

 
const hashingConfig = { // based on OWASP cheat sheet recommendations (as of March, 2022)
    parallelism: 1,
    memoryCost: 64000, // 64 mb
    timeCost: 3 // number of iterations
}

const hashPassword = async function (password) {
  let salt = crypto.randomBytes(16);
  const encryptedPass = await argon2.hash(password)

  return {
    iv: salt,
    password: encryptedPass
    }
} 

// async function hashPassword(password) {
//     let salt = crypto.randomBytes(16);
//     return await argon2.hash(password, {
//         ...hashingConfig,
//         salt,
//     })
// }



// async function hashPassword(password) {
//     try {
//         return await argon2.hash(password)
//     } catch {
//         console.log('Error');
//     }
//   }
  
// WORKING
//   async function hashPassword(password) {
//     try {
//     return await argon2.hash(password)
//     } catch {
//         console.log('Error');
//     }
//   }
// WORKING

//   hashPassword('password').then((hashedPassword) => {
//    console.log("printing_hashedPW:",hashedPassword);
//   });
  
//   function getSalt () {
//   let salt = (crypto.randomBytes(16));
//   return salt
//   }



// const hashPassword = (password) => {
//   const salt = (crypto.randomBytes(16));
//   try {
//       const encryptedPass = argon2.hash({password:`password`, iv:salt})
//       console.log("encryptedPass",encryptedPass )
//     }
//     catch {
//         console.log("ERROR" + err);
//     }
//     // const encryptedHashConfig = argon2.hash(hashingConfig)
// }
// hashPassword()

//   function hashPassword(password) {
//     try {
//         const salt = (crypto.randomBytes(16));
//         const hash = argon2.hash(password, {
//                         ...hashingConfig,
//                         salt,
//                     })
//         return {password:hash, iv: salt}
//     } catch {
//         console.log('Error');
//     }
//   }
//   hashPassword()

//   const AhashedPassword = async() => { await hashPassword(password);
//   console.log(AhashedPassword);
// }

// async function hashPassword(password) {
//   const salt = (crypto.randomBytes(16));
//   try {
//       const encryptedPw = await argon2.hash(password, {
//           ...hashingConfig,
//           salt
//         })
//     } catch {
//         console.log('Error');
//     }
// }

// console.log("hashPassword", hashPassword);
// hashPassword(password).then((hashedPassword) => {
//   console.log(hashedPassword);
// });

 
const verifyArg2pw = async function (hashedPW, password) {
    return argon2.verify(hashedPW, password);
}
// hashPassword("somePassword").then(async (hash) => {
//     console.log("Hash + salt of the password:", hash)
//     console.log("Password verification success:", await verifyPasswordWithHash("somePassword", hash));
// });

module.exports = { hashPassword, verifyArg2pw, hashingConfig }
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require('crypto');
const argon2 = require('argon2');

const hashingConfig = {
    // based on OWASP cheat sheet recommendations (as of March, 2022)
    parallelism: 1,
    memoryCost: 64000, // 64 mb
    timeCost: 3, // number of iterations
};

// async function hashPassword(password) {
//     let salt = crypto.randomBytes(16);
//     return await argon2.hash(password, {
//         ...hashingConfig,
//         salt,
//     })
// }
const hashPassword = async (password) => {
    const salt = crypto.randomBytes(16);
    const encryptedPass = await argon2.hash(password, {
        ...hashingConfig,
        salt,
    });
    // const encryptedHashConfig = argon2.hash(hashingConfig)

    return {
        iv: salt,
        password: encryptedPass,
        //   hashConfig: encryptedHashConfig,
    };
};
console.log(hashPassword);
hashedPassword();
//   async function hashPassword(password) {
//     try {
//         const salt = (crypto.randomBytes(16));
//         const hash = await argon2.hash(password, {
//                         ...hashingConfig,
//                         salt,
//                     })
//         return {password:hash, iv: salt}
//     } catch {
//         console.log('Error');
//     }
//   }

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

console.log('hashPassword', hashPassword);
// hashPassword(password).then((hashedPassword) => {
//   console.log(hashedPassword);
// });

const verifyPasswordWithHash = (password, hash) => {
    return argon2.verify(hash, password, hashingConfig);
};

// hashPassword("somePassword").then(async (hash) => {
//     console.log("Hash + salt of the password:", hash)
//     console.log("Password verification success:", await verifyPasswordWithHash("somePassword", hash));
// });

module.exports = { hashPassword, verifyPasswordWithHash, hashingConfig };

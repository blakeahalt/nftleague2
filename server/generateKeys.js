const crypto = require('crypto');
const dotenv = require("dotenv")
dotenv.config()

const key = crypto.randomBytes(32).toString('hex')
    console.log(key);


// To generate random SHA-256 hash go to server folder, then run: 'node generateKeys.js' in terminal
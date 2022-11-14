const crypto = require('crypto');
// import dotenv = require('dotenv');
// require("dotenv")
const dotenv = require("dotenv")
dotenv.config()

const key1 = crypto.randomBytes(32).toString('hex')
// const jwtKey = process.env.REACT_APP_JWTSECRET;
// console.log('jwtKey', jwtKey);
console.log(key1);
// console.log('process.env', process.env);

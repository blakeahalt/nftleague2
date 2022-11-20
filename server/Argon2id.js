import { argon2id, argon2Verify } from 'hash-wasm';

async function run() {
  const salt = new Uint8Array(16);
  window.crypto.getRandomValues(salt);

  const key = await argon2id({
    password: 'pass',
    salt, // salt is a buffer containing random bytes
    parallelism: 1,
    iterations: 256,
    memorySize: 512, // use 512KB memory
    hashLength: 32, // output size = 32 bytes
    outputType: 'encoded', // return standard encoded string containing parameters needed to verify the key
  });

  console.log('Derived key:', key);

  const isValid = await argon2Verify({
    password: 'pass',
    hash: key,
  });

  console.log(isValid ? 'Valid password' : 'Invalid password');
}

run();
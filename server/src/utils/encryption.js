const crypto = require('crypto');
require('dotenv').config();

const IV_LENGTH = 16; // For AES, this is always 16

//TODO Add a random Intilization Vector

function encryptStream(key) {
  let iv = Buffer.from(process.env.IV, 'hex');
  let ENCRYPTION_KEY = crypto.createHash('sha256').update(key).digest();
  let cipher = crypto.createCipheriv('aes256', ENCRYPTION_KEY, iv);
  return cipher;
}

function decryptStream(key) {
  let iv = Buffer.from(process.env.IV, 'hex');
  let ENCRYPTION_KEY = crypto.createHash('sha256').update(key).digest();
  let decipher = crypto.createDecipheriv('aes256', ENCRYPTION_KEY, iv);
  return decipher;
}

module.exports = { decryptStream, encryptStream };

const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // AES block size

/**
 * Encrypts a string using AES-256-CBC
 * @param {string} text - The text to encrypt
 * @param {string} key - The encryption key (must be 32 bytes long)
 * @returns {string} The encrypted string in base64 format
 */
function encrypt(text, key = process.env.encryptionKey) {
    if (key.length !== 32) {
        throw new Error('Key must be 32 bytes long');
    }
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return iv.toString('base64') + ':' + encrypted;
}

/**
 * Decrypts an AES-256-CBC encrypted string
 * @param {string} encryptedText - The encrypted text in base64 format
 * @param {string} key - The decryption key (must be 32 bytes long)
 */
function decrypt(encryptedText, key = process.env.encryptionKey) {
    if (key.length !== 32) {
        return {error:"Could not get data enc-dcy-svs. Key length"};
    }
    try {
        const parts = encryptedText.split(':');
        if (parts.length !== 2) {
            return {error:"Could not get data enc-dcy-svs. Key length"};
        }
        const iv = Buffer.from(parts[0], 'base64');
        const encryptedData = parts[1];
        const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return {data:decrypted,error:false};
    } catch (error) {
        console.error('Decryption failed:', error.message);
        return {error:"Could not get data enc-dcy-svs"};
    }
}

module.exports = { encrypt, decrypt };

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
    const iv = Buffer.from(key.substring(0, 16)); // Using first 16 characters as IV
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

/**
 * Decrypts an AES-256-CBC encrypted string
 * @param {string} encryptedText - The encrypted text in base64 format
 * @param {string} key - The decryption key (must be 32 bytes long)
 */
function decrypt(encryptedText, key = process.env.encryptionKey) {
    console.log(key, key.length)
    if (key.length != 32) {
        return {error:"Could not get data enc-dcy-svs. Key length"};
    }
    try {
        const iv = Buffer.from(key.substring(0, 16)); // Using first 16 characters as IV
        const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return {data:decrypted,error:false};
    } catch (error) {
        console.error('Decryption failed:', error.message);
        return {error:"Could not get data enc-dcy-svs"};
    }
}

module.exports = { encrypt, decrypt };









/////////////////////////////react////////////////////////

import CryptoJS from 'crypto-js';

const SECRET_KEY = 'alalalalalalalalalalalalaskskdkfkgm12p'; // Must be 32 characters long

/**
 * Encrypts a string using AES encryption
 * @param {string} text - The text to encrypt
 * @param {string} key - The encryption key (must be 32 characters long)
 * @returns {string} The encrypted string in base64 format
 */
export function encrypt(text, key = SECRET_KEY) {
    if (key.length !== 32) {
        throw new Error('Key must be 32 characters long');
    }
    const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: CryptoJS.enc.Utf8.parse(key.substring(0, 16)) // Using the first 16 characters as IV
    });
    return encrypted.toString();
}

/**
 * Decrypts an AES encrypted string
 * @param {string} encryptedText - The encrypted text in base64 format
 * @param {string} key - The decryption key (must be 32 characters long)
 */
export function decrypt(encryptedText, key = SECRET_KEY) {
    if (key.length !== 32) {
        alert("Error occured. Enc-dcy")
        return null
    }
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: CryptoJS.enc.Utf8.parse(key.substring(0, 16))
        });
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        return decryptedText || null; // Return null if decryption results in an empty string
    } catch (error) {
        console.error('Decryption failed:', error.message);
        alert("Error occured. Enc-dcy")
        return null

    }
}


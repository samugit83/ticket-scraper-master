import crypto from 'crypto';




export function genPassword(password: string) {

    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    interface PasswordResult {
        hashstring: string;
        salt: string;
    }
    
    const passres: PasswordResult = {
        salt: salt,
        hashstring: genHash
    }


    return passres

};


export function validPassword(password: string, hashstring: string, salt: string): boolean {

    let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hashstring === hashVerify;

}



export function encrypt(text: string, key: string): string {
    // Generate a random IV (Initialization Vector)
    const randomIV = crypto.randomBytes(16);

    // Create a cipher using AES-256-CBC algorithm with the provided key and the random IV
    const cipher = crypto.createCipheriv('aes-256-cbc', key, randomIV);

    // Update the cipher with the text to be encrypted (encoded as 'utf-8')
    let encrypted = cipher.update(text, 'utf-8', 'hex');

    // Finalize the encryption process and get the remaining encrypted data
    encrypted += cipher.final('hex');

    // Concatenate the IV and the encrypted text and return as a single string
    return randomIV.toString('hex') + encrypted;
}



  export function decrypt(encryptedText: string, key: string): string {
    // Extract the first 32 characters as the IV
    const ivHex = encryptedText.substr(0, 32);
    const iv = Buffer.from(ivHex, 'hex');
  
    // Extract the remaining characters as the encrypted text
    const encrypted = encryptedText.substr(32);
  
    // Create a decipher using AES-256-CBC algorithm with the provided key and IV
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  
    // Update the decipher with the encrypted text
    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  
    // Finalize the decryption process and get the remaining decrypted data
    decrypted += decipher.final('utf-8');
  
    return decrypted;
  }
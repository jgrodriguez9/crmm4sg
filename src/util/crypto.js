import CryptoJS from "crypto-js";

const secretPass = process.env.REACT_APP_SECRET;

export const encryptData = (str) => {
    let encrypted =  CryptoJS.AES.encrypt(str, secretPass).toString();
    return encrypted;
};

export const decrypData = (str) => {
    let decrypted = CryptoJS.AES.decrypt(str, secretPass);
    return decrypted.toString(CryptoJS.enc.Utf8);
}
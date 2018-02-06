import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable()
export class Encryption{

    base64Key = CryptoJS.enc.Base64.parse("WXl5MWpJZDd3Q0NXOGV2bzJ0QlA");
    iv = CryptoJS.enc.Base64.parse("N1JSOHhDR251M1EzOHRqUVNxdDk");

    public setHash(account: string, typeAccount: string): string{
        var encrypted = CryptoJS.AES.encrypt(
            account + typeAccount,
            this.base64Key,
            { iv: this.iv });
        //console.log('encrypted = ' + encrypted);
        
        var ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
        //console.log('ciphertext = ' + ciphertext);
        
        return ciphertext;
      }
      
      public getHash(ciphertext: string){

        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
        });

        var decrypted = CryptoJS.AES.decrypt(
            cipherParams,
            this.base64Key,
            { iv: this.iv });
        var descrString = decrypted.toString(CryptoJS.enc.Utf8);
        //console.log('decrypted='+ descrString);
      }

      public getPasswordEcrypted(ciphertext: string): string {
        // Decrypt...
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
        });

        var decrypted = CryptoJS.AES.decrypt(
            cipherParams,
            this.base64Key,
            { iv: this.iv });
        var descrString = decrypted.toString(CryptoJS.enc.Utf8);
        //console.log('decrypted='+ descrString);

        return descrString;
    }
    
    public setPasswordEncrypted(password: string, hash: string): string {
        // Encrypt 
        var encryptedPassword = CryptoJS.AES.encrypt(
            password + hash,
            this.base64Key,
            { iv: this.iv });
        //console.log('encrypted Password = ' + encryptedPassword);
        
        var ciphertext = encryptedPassword.ciphertext.toString(CryptoJS.enc.Base64);
        //console.log('ciphertext Password= ' + ciphertext);
        
        return ciphertext;
    }

}
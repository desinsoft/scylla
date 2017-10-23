import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { Credentials } from '../../models/credentials';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';

import CryptoJS from 'crypto-js';

@Component({
  selector: 'page-credentials',
  templateUrl: 'credentials.html',
  providers: [AngularFireDatabase]
})
export class CredentialsPage {
  credentials = {} as Credentials;
  private CryptoJS: any = null;
  private SECERET_KEY: string = '';
  private password: string = '';
  private letras = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
  private numeros = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9');


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private auth: AngularFireAuth,
    private dataBase: AngularFireDatabase) {
  }
  
  createCredentials(){
    console.log("pasando por credenciales");
    this.credentials.hash = this.getHash();
    this.credentials.password = this.setPasswordEncrypted(this.credentials.password, this.credentials.hash).toString();
    //this.credentials.password = this.password;
    this.auth.authState.take(1).subscribe(auth => {
      this.dataBase.object(`wallet/${auth.uid}/credentials/${this.getHash().toString()}`).set(this.credentials)
      .then(() => this.navCtrl.setRoot(HomePage))
    });
  }

  public getHash(): string{
    var cLetra = this.letras[Math.floor(Math.random()*this.letras.length)];
    var cNumero = this.numeros[Math.floor(Math.random()*this.numeros.length)];
    return cLetra + cNumero;
  }

  public getPasswordEcrypted(passwordView): string {
      // Decrypt 
      var bytes = this.CryptoJS.AES.decrypt(passwordView.toString(), this.SECERET_KEY);
      var plaintext = bytes.toString(this.CryptoJS.enc.Utf8);
      return plaintext;
  }

  public setPasswordEncrypted(password: string, hash: string): string {
      // Encrypt 
      var ciphertext = CryptoJS.AES.encrypt(password, hash);
      return ciphertext;
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { Credentials } from '../../models/credentials';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';

import { Encryption } from '../../providers/encryption';

@Component({
  selector: 'page-credentials',
  templateUrl: 'credentials.html',
  providers: [AngularFireDatabase]
})
export class CredentialsPage {
  credentials = {} as Credentials;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private auth: AngularFireAuth,
    private dataBase: AngularFireDatabase,
    private encryption: Encryption) {
  }
  
  createCredentials(){
    this.credentials.hash = this.encryption.setHash(this.credentials.account, 'hash');
    this.credentials.accountID =  this.encryption.setHash(this.credentials.account, 'ID');
    this.credentials.password = this.encryption.setPasswordEncrypted(this.credentials.password + ":", this.credentials.hash).toString();
    //this.credentials.password = this.password;
    this.auth.authState.take(1).subscribe(auth => {
      this.dataBase.object(`wallet/${auth.uid}/credentials/${this.credentials.accountID}`).set(this.credentials)
      .then(() => this.navCtrl.setRoot(HomePage))
    });
  }
}

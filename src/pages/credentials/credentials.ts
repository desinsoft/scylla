import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

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
    private encryption: Encryption, 
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController) {
  }
  
  createCredentials(){
    alert(this.credentials.observation);
    this.credentials.hash = this.encryption.setHash(this.credentials.account, 'hash');
    this.credentials.accountID =  this.encryption.setHash(this.credentials.account.toLocaleLowerCase(), 'ID');
    this.credentials.password = this.encryption.setPasswordEncrypted(this.credentials.password + ":", this.credentials.hash).toString();
    //this.credentials.password = this.password;
    this.auth.authState.take(1).subscribe(auth => {
      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content: 'Creating credential'
      });
      loading.present();
      this.dataBase.object(`wallet/${auth.uid}/credentials/${this.credentials.accountID}`).set(this.credentials)
      .then(() => {
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Credential create successful',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(HomePage)
      })
    });
  }
}

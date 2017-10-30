import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

import { Profile } from '../../models/profile';
import { Credentials } from '../../models/credentials';
import { CredentialsPage } from '../../pages/credentials/credentials';

import { Encryption } from '../../providers/encryption';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireAuth, AngularFireDatabase]
})
export class HomePage {

  profileData: AngularFireObject<Profile>
  profiles: Observable<any>;
  credentials: Observable<any>;
  credential= {} as Credentials;

  constructor(public navCtrl: NavController, 
    private auth: AngularFireAuth, 
    private toas: ToastController,
    private dataBase: AngularFireDatabase,
    public alertCtrl: AlertController,
    private encryption: Encryption) {

    this.auth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.toas.create({
          message: `Welcome to APP_NAME, ${data.email}`,
          duration: 3000
        }).present();
        //console.log(this.dataBase.object(`profile/${data.uid}`));
        this.profiles = this.dataBase.object(`profile/${data.uid}`).valueChanges();
       /*
        this.dataBase.list(`wallet/${data.uid}/credentials`).valueChanges().subscribe(res => {
          console.log(res);
        });
       */
       this.credentials = this.dataBase.list(`wallet/${data.uid}/credentials`).valueChanges();
       console.log(this.credentials);
      }
      else{
        this.toas.create({
          message: 'Could not found authentication data',
          duration: 3000
        }).present();
      }
    });
  }

  addCredential(){
    this.navCtrl.push(CredentialsPage);
  }

  /*
  updateCredential(accountID){
    alert(JSON.stringify(accountID));
    this.auth.authState.take(1).subscribe(auth => {
      this.dataBase.object(`wallet/${auth.uid}/credentials/${this.credentials.accountID}`).set(this.credentials)
      .then(() => this.navCtrl.setRoot(HomePage))
    });
  }
  */

  viewCredential(credentialObj) {
    var passwordHash = this.encryption.getPasswordEcrypted(credentialObj.password);
    console.log(passwordHash);
    var password = passwordHash.split(":");
    const alert = this.alertCtrl.create({
      title: 'Contraseña actual',
      subTitle: 'Su contraseña actualmente es: ' + password[0],
      buttons: ['Aceptar']
    });
    alert.present();
  }

  updateCredential(credentialObj) {
    const alert = this.alertCtrl.create({
      title: 'Actualizar contraseña',
      inputs: [
        {
          name: 'newpassword',
          placeholder: 'Nueva contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            this.auth.authState.take(1).subscribe(auth => {
              this.credential = credentialObj;
              console.log(data.password);
              this.credential.hash = this.encryption.setHash(credentialObj.account, 'hash');
              this.credential.password = this.encryption.setPasswordEncrypted(data.name + ":", this.credential.hash).toString();
              this.dataBase.object(`wallet/${auth.uid}/credentials/${credentialObj.accountID}`).set(this.credential)
              .then(() => this.navCtrl.setRoot(HomePage))
            });
          }
        }
      ]
    });
    alert.present();
  }

  deleteCredential(accountID){
    alert(accountID);
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

import { Profile } from '../../models/profile';
import { Credentials } from '../../models/credentials';
import { CredentialsPage } from '../../pages/credentials/credentials';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireAuth, AngularFireDatabase]
})
export class HomePage {

  profileData: AngularFireObject<Profile>
  profiles: Observable<any>;
  credentials: any;
  credential = {} as Credentials;

  constructor(public navCtrl: NavController, 
    private auth: AngularFireAuth, 
    private toas: ToastController,
    private dataBase: AngularFireDatabase) {

    this.auth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.toas.create({
          message: `Welcome to APP_NAME, ${data.email}`,
          duration: 3000
        }).present();
        //console.log(this.dataBase.object(`profile/${data.uid}`));
        this.profiles = this.dataBase.object(`profile/${data.uid}`).valueChanges();
        this.dataBase.list(`wallet/${data.uid}`).valueChanges().subscribe(res => {
          console.log(res);
        });
       this.credentials = this.dataBase.list(`wallet/${data.uid}/credentials`).snapshotChanges().map(credentials => {
        console.log(credentials.map(c => ({ key: c.payload.key, value: c.payload.val() })));
        this.credentials = credentials.map(c => ({ key: c.payload.key, value: c.payload.val() }));
        console.log(this.credentials);
        for (var index = 0; index < this.credentials.length; index++) {
          let values = {} as any;

          values.account = this.credentials[index].value.account;
          values.hash = this.credentials[index].value.hash;
          values.password = this.credentials[index].value.password;
          
          console.log(values);
          this.credential += values;
        }
        console.log(this.credentials);
       });
       console.log(this.credential);
        //this.profileData.query (profile.);
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
}

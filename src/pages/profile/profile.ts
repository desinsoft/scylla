import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Profile } from '../../models/profile';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',

  providers: [AngularFireDatabase]
})
export class ProfilePage {

  profile = {} as Profile;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private auth: AngularFireAuth, 
    private dataBase: AngularFireDatabase) {
  }

  createProfile(){
    this.auth.authState.take(1).subscribe(auth => {
      this.dataBase.object(`profile/${auth.uid}`).set(this.profile)
      .then(() => this.navCtrl.setRoot(HomePage))
    })
  }

}

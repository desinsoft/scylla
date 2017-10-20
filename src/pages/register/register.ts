import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AngularFireAuth]
})
export class RegisterPage {
  
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth) {
  }

  async register(user: User){
    alert("pasando por register");
    try {
      const result = await this.auth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
    }
    catch(e){
      console.error(e);
    }
  }
}

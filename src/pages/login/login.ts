import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { RegisterPage } from '../../pages/register/register';
import { TabsPage } from '../../pages/tabs/tabs';

import { User } from '../../models/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = {} as User;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth) {
  }

  async login(user: User){
    try{
      const result = this.auth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result){
        this.navCtrl.setRoot(TabsPage);
      }
    }
    catch(e){
      console.log(e);
    }
  }

  register(){
    this.navCtrl.push(RegisterPage)
  }

}

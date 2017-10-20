import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RegisterPage } from '../../pages/register/register';

import { User } from '../../models/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  login(){

  }

  register(){
    this.navCtrl.push(RegisterPage)
  }

}

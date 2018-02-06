import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private auth: AngularFireAuth, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  register(user: User){
    let loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
      content: 'Reseting your password'
    });
    loading.present();
    this.auth.auth.createUserWithEmailAndPassword(user.email, user.password).then(()=> {
      loading.dismiss().then(() =>{
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'User create successful',
          buttons: ['OK']
        });
        alert.present();
      });
      this.navCtrl.push(LoginPage);
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'Error creating user',
        subTitle: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }
}

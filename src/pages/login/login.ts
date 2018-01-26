import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth,
    private alertCtrl: AlertController) {
  }

  async login(user: User){
      this.auth.auth.signInWithEmailAndPassword(user.email, user.password).then(auth => {
        this.navCtrl.setRoot(TabsPage);
      }).catch(function(error){
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Ohh!. El usuario o la contraseña son incorrectas.');
        } else {
          alert(errorMessage);
        }
      });
      /**
       * this.auth.auth.onAuthStateChanged(function(user) {
        if (user !== null) {
          this.goHomePage();
        }
      });
       */
      //this.navCtrl.setRoot(TabsPage);
  }

  register(){
    this.navCtrl.push(RegisterPage)
  }
  
  goHomePage(){
    this.navCtrl.setRoot(TabsPage);
  }

  recover(){
    const alert = this.alertCtrl.create({
      title: 'Recover your password',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            "We have sent your current password to the entered email";
          }
        }
      ]
    });
    alert.present();
  }
}

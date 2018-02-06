//import { Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { RegisterPage } from '../../pages/register/register';
import { TabsPage } from '../../pages/tabs/tabs';

import { User } from '../../models/user';
//import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = {} as User;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController ) {
  }

  async login(user: User){
      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content: 'Login'
      });
      loading.present();
      this.auth.auth.signInWithEmailAndPassword(user.email, user.password).then(auth => {
        loading.dismiss().then(() =>{
          let alert = this.alertCtrl.create({
            title: 'Check your email',
            subTitle: 'Login successful',
            buttons: ['OK']
          });
          alert.present();
        })
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
            let loading = this.loadingCtrl.create({
              dismissOnPageChange: true,
              content: 'Reseting your password'
            });
            loading.present();
            /*
            let email = {
              to: 'jossenino@gmail.com',
              subject: 'Your password - Scylla',
              body: 'This is your passowrd for login into app Scylla ->',
              isHtml: true
            };
            this.emailComposer.open(email);
            */
            this.auth.auth.sendPasswordResetEmail(data.email).then(()=>{
              loading.dismiss().then(() =>{
                let alert = this.alertCtrl.create({
                  title: 'Check your email',
                  subTitle: 'Password reset successful',
                  buttons: ['OK']
                });
                alert.present();
              })
            }, error => {
              let alert = this.alertCtrl.create({
                title: 'Error resetting password',
                subTitle: error.message,
                buttons: ['OK']
              });
              alert.present();
            });
          }
        }
      ]
    });
    alert.present();
  }
}

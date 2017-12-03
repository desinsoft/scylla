import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

import { Profile } from '../../models/profile';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',

  providers: [AngularFireDatabase]
})
export class ProfilePage {

  profile = {} as Profile;
  profiles: Observable<any>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private auth: AngularFireAuth, 
    private dataBase: AngularFireDatabase,
    public alertCtrl: AlertController) {
      this.auth.authState.subscribe(data => {
        if(data && data.email && data.uid){      
          this.profiles = this.dataBase.object(`profile/${data.uid}`).valueChanges();
        }
      });
  }

  createProfile(){
    const alert = this.alertCtrl.create({
      title: 'Actualizar perfil',
      inputs: [
        {
          name: 'username',
          placeholder: 'Nombre usuario'
        },
        {
          name: 'firstName',
          placeholder: 'Nombres'
        },
        {
          name: 'lastName',
          placeholder: 'Apellidos'
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
            if(data.firstName !== undefined){
              this.profile.firstName = data.firstName;
            }
            if(data.lastName !== undefined){
              this.profile.lastName = data.lastName;
            }
            if(data.username !== undefined){
              this.profile.username = data.username;
            }
            this.auth.authState.take(1).subscribe(auth => {
              this.dataBase.object(`profile/${auth.uid}`).set(this.profile);
            })
          }
        }
      ]
    });
    alert.present();
  }

}

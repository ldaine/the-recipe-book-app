import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {

  constructor(public navCtrl: NavController, 
              private authService: AuthService, 
              private loadingCtrl: LoadingController, 
              private alertCtrl: AlertController) {}

  ngOnInit(){
  }

  onSignup(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: "Signing you up ..."
    }); 

    loading.present(); 
    this.authService.signup(form.value.email, form.value.password).then(data=>{
      console.log(data); 
      loading.dismiss(); 
    }).catch(error=>{
      console.log(error); 
      loading.dismiss(); 
      const alert = this.alertCtrl.create({
        title: "Signup failed", 
        message: error.message, 
        buttons: ['OK']
      }); 
      alert.present(); 
    }); 
    //this.navCtrl.setRoot("LoginPage", form.value); 
  }

}

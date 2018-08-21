import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {

  signupForm: FormGroup; 

  constructor(public navCtrl: NavController) {
  }

  ngOnInit(){
    this.signupForm = new FormGroup({
      email: new FormControl(null, Validators.required), 
      password: new FormControl(null, Validators.required)
    })
  }

  onSignup(){
    this.navCtrl.setRoot("LoginPage")
  }

}

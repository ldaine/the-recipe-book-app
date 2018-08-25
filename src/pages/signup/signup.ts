import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {

  constructor(public navCtrl: NavController) {}

  ngOnInit(){
  }

  onSignup(form: NgForm){
    this.navCtrl.setRoot("LoginPage", form.value); 
  }

}

import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase'; 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  recipePage:any = TabsPage;
  signinPage:any = "SigninPage";
  signupPage:any = "SignupPage";

  @ViewChild('nav') nav:NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    firebase.initializeApp({
      apiKey: "AIzaSyA5QQabKoZUqOtjd-RorUhxtFpcyuQXrD8",
      authDomain: "the-recipe-book-59041.firebaseapp.com"
    }); 
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

     
  }

  onLoad(page:any){
    this.nav.setRoot(page); 
    this.menuCtrl.close();
  }

  onLogout(){
    console.log("on logout"); 
    this.menuCtrl.close();
  }
}


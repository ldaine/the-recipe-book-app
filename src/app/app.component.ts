import { AuthService } from './../services/auth';
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
  rootPage:any = TabsPage;
  signinPage:any = "SigninPage";
  signupPage:any = "SignupPage";

  isAuthenticated: boolean = false; 

  @ViewChild('nav') nav:NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyA5QQabKoZUqOtjd-RorUhxtFpcyuQXrD8",
      authDomain: "the-recipe-book-59041.firebaseapp.com"
    }); 

    firebase.auth().onAuthStateChanged(user=> {
      if(user){
        this.isAuthenticated = true; 
        this.rootPage = TabsPage; 
      } else {
        this.isAuthenticated = false; 
        this.rootPage = this.signinPage; 
      }
    })
    
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
    this.authService.logout().then(data=>{
      console.log(data); 
    })
    this.menuCtrl.close();
    this.nav.setRoot(this.signinPage); 
  }
}


import { TabsPage } from './../tabs/tabs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: "page-signin", 
    templateUrl: "signin.html"
})
export class SigninPage implements OnInit{

    loginForm: FormGroup; 

    constructor(private navCtrl: NavController){}

    ngOnInit(){
        this.loginForm = new FormGroup({
            email: new FormControl(null, Validators.required), 
            password: new FormControl(null, Validators.required)
        })
    }

    onLogin(){
        this.navCtrl.push(TabsPage); 
        //console.log('on login'); 
    }
}
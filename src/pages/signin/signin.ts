import { TabsPage } from './../tabs/tabs';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: "page-signin", 
    templateUrl: "signin.html"
})
export class SigninPage implements OnInit{


    constructor(private navCtrl: NavController){}

    ngOnInit(){
        
    }

    onLogin(form: NgForm){
        this.navCtrl.push(TabsPage); 
        //console.log('on login'); 
    }
}
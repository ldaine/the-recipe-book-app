import { AuthService } from './../../services/auth';
import { TabsPage } from './../tabs/tabs';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@IonicPage()
@Component({
    selector: "page-signin", 
    templateUrl: "signin.html"
})
export class SigninPage implements OnInit{


    constructor(private navCtrl: NavController, 
                private authService: AuthService, 
                private loadingCtrl: LoadingController, 
                private alertCtrl: AlertController
            ){}

    ngOnInit(){
        
    }

    onLogin(form: NgForm){
        const loading = this.loadingCtrl.create({
            content: "Signing you in ..."
        }); 
    
        loading.present(); 
        this.authService.signin(form.value.email, form.value.password).then(data=>{
            console.log(data); 
            loading.dismiss(); 
            //this.navCtrl.setRoot("LoginPage", form.value);
        }).catch(error=>{
            console.log(error); 
            loading.dismiss(); 
            const alert = this.alertCtrl.create({
                title: "Signin failed", 
                message: error.message, 
                buttons: ['OK']
            }); 
            alert.present(); 
        }); 
           
    }
}
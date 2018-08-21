import { IonicPageModule } from 'ionic-angular';
import { SigninPage } from './signin';
import { NgModule } from '@angular/core';

@NgModule({
    declarations:[SigninPage], 
    imports: [IonicPageModule.forChild(SigninPage)]
})
export class SigninPageModule{}
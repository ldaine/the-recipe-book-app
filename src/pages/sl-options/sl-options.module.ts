import { NgModule } from '@angular/core';
import { SLOptionsPage } from './sl-options';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [SLOptionsPage], 
    imports: [IonicPageModule.forChild(SLOptionsPage)]
})
export class SLOptionsPageModule{}
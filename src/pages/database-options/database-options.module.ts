import { NgModule } from '@angular/core';
import { DatabaseOptionsPage } from './database-options';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [DatabaseOptionsPage], 
    imports: [IonicPageModule.forChild(DatabaseOptionsPage)]
})
export class DatabaseOptionsPageModule{}
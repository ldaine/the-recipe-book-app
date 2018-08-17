import { IonicPageModule } from 'ionic-angular';
import { RecipesPage } from './recipes';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [RecipesPage], 
    imports: [IonicPageModule.forChild(RecipesPage)]
})
export class RecipesPageModule{}
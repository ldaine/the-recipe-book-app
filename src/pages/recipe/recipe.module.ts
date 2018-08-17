import { RecipePage } from './recipe';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [RecipePage], 
    imports: [IonicPageModule.forChild(RecipePage)]
})
export class RecipePageModule{}
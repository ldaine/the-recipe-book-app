import { IonicPageModule } from 'ionic-angular';
import { EditRecipePage } from './edit-recipe';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [EditRecipePage], 
    imports: [IonicPageModule.forChild(EditRecipePage)]
})
export class EditRecipePageModule {}
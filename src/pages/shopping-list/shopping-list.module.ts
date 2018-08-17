import { ShoppingListPage } from './shopping-list';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [ShoppingListPage], 
    imports: [IonicPageModule.forChild(ShoppingListPage)]
})

export class ShoppingListPageModule {}
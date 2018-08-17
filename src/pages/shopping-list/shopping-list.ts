import { ShoppingListItem } from './../../data/shopping-list-item.interface';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ShoppingListService } from '../../services/shopping-list';

@IonicPage()
@Component({
    selector: "page-shopping-list", 
    templateUrl: "shopping-list.html"
})
export class ShoppingListPage {

    shoppingList: ShoppingListItem[] = []; 

    constructor(private shoppingListService: ShoppingListService){

    }
    
    ionViewWillEnter(){
        this.shoppingList = this.shoppingListService.getShoppingList(); 
    }
}
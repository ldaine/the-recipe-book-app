import { ShoppingListItem } from './../data/shopping-list-item.interface';
import { Injectable } from "@angular/core";

@Injectable()
export  class ShoppingListService {
    shoppingList: ShoppingListItem[] = []; 

    getShoppingList(){
        return this.shoppingList; 
    }

    addToShoppingList(item: ShoppingListItem){
        this.shoppingList.push(item); 
    }
}
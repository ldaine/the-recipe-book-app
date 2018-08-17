import { Ingredient } from './../models/ingredient';
import { Injectable } from "@angular/core";

@Injectable()
export  class ShoppingListService {
    private ingredients: Ingredient[] = []; 

    getItems():Ingredient[]{
        return this.ingredients.slice(); 
    }

    addItem(name: string, amount: number){
        this.ingredients.push(new Ingredient(name, amount)); 
        console.log(this.ingredients); 
    }

    addItems(items: Ingredient[]){
        this.ingredients.push(...items); 
    }

    removeItem(index:number){
        this.ingredients.splice(index, 1); 
    }
}
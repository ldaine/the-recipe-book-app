import { Ingredient } from './../../models/ingredient';
import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { ShoppingListService } from '../../services/shopping-list';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
    selector: "page-shopping-list", 
    templateUrl: "shopping-list.html"
})
export class ShoppingListPage {

    shoppingList: Ingredient[] = []; 

    constructor(private shoppingListService: ShoppingListService, 
                private alertCtrl:AlertController){}
    
    ionViewWillEnter(){
        this.loadItems(); 
    }

    onAddItem(form:NgForm){
        this.shoppingListService.addItem(form.value.ingredientName, form.value.amount); 
        //empty input fields
        form.reset(); 
        this.loadItems(); 
    }

    onRemoveItem(index: number){
        const alert = this.alertCtrl.create({
            title: "Delete item", 
            message: "Do you really want to delete the ingredient?", 
            buttons:[
                {
                    text: "Cancel", 
                    role: "cancel", 
                    handler: ()=>{
                        console.log("cancel"); 
                    }
                }, 
                {
                    text: "Yes", 
                    handler: ()=>{
                        this.shoppingListService.removeItem(index); 
                        this.loadItems();
                    }
                }
            ]
        }); 
        alert.present(); 
    }

    private loadItems(){
        this.shoppingList = this.shoppingListService.getItems(); 
    }
}
import { AuthService } from './../../services/auth';
import { Ingredient } from './../../models/ingredient';
import { Component } from '@angular/core';
import { IonicPage, AlertController, PopoverController } from 'ionic-angular';
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
                private alertCtrl:AlertController, 
                private popoverCtrl: PopoverController, 
                private authService: AuthService){}
    
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

    onShowOptions(event: MouseEvent){
        const popover = this.popoverCtrl.create("SLOptionsPage"); 
        popover.present({ev:event}); 
        popover.onDidDismiss(
            data=>{
                if (data.action == 'load'){
                    this.authService.getActiveUser().getIdToken()
                    .then(
                        (token:string)=>{
                            this.shoppingListService.fetchList(token)
                            .subscribe(
                                (list:Ingredient[])=>{
                                    console.log('success',data); 
                                    if(list){
                                        this.shoppingList = list; 
                                    } else {
                                        this.shoppingList = []; 
                                    }
                                }, 
                                error=>{
                                    console.log('error', error); 
                                }
                            )
                        }
                    ); 
                } else {
                    this.authService.getActiveUser().getIdToken()
                    .then(
                        (token:string)=>{
                            this.shoppingListService.storeList(token)
                                .subscribe(
                                    data=>{
                                        console.log('success',data); 
                                    }, 
                                    error=>{
                                        console.log('error', error); 
                                    }
                                )
                        }
                    ); 
                }
            }
        );
    }
}
import { AuthService } from './../../services/auth';
import { Ingredient } from './../../models/ingredient';
import { Component } from '@angular/core';
import { IonicPage, AlertController, PopoverController, LoadingController } from 'ionic-angular';
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
                private loadingCtrl: LoadingController, 
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

        onShowOptions(event: MouseEvent){
        const loading = this.loadingCtrl.create({
            content:"Please wait..."
        }); 
        const popover = this.popoverCtrl.create("DatabaseOptionsPage"); 
        popover.present({ev:event}); 
        popover.onDidDismiss(
            data=>{
                if(!data){
                    return; 
                }
                if (data.action == 'load'){
                    loading.present(); 
                    this.authService.getActiveUser().getIdToken()
                    .then(
                        (token:string)=>{
                            this.shoppingListService.fetchList(token)
                            .subscribe(
                                (list:Ingredient[])=>{
                                    loading.dismiss(); 
                                    console.log('success',data); 
                                    if(list){
                                        this.shoppingList = list; 
                                    } else {
                                        this.shoppingList = []; 
                                    }
                                }, 
                                error=>{
                                    loading.dismiss(); 
                                    this.handleError(error.json().error)
                                }
                            )
                        }
                    ); 
                } else if (data.action == 'store'){
                    loading.present(); 
                    this.authService.getActiveUser().getIdToken()
                    .then(
                        (token:string)=>{
                            this.shoppingListService.storeList(token)
                                .subscribe(
                                    data=>{
                                        loading.dismiss(); 
                                        console.log('success',data); 
                                    }, 
                                    error=>{
                                        loading.dismiss(); 
                                        this.handleError(error.json().error)
                                    }
                                )
                        }
                    ); 
                }
            }
        );
    }

    private loadItems(){
        this.shoppingList = this.shoppingListService.getItems(); 
    }

    private handleError(errorMessage: string){
        const alert = this.alertCtrl.create({
            title: "An error occured!", 
            message: errorMessage, 
            buttons:['Ok']
        }); 
        alert.present(); 
    }
}
import { Recipe } from './../../data/recipe.interface';
import { RecipesService } from './../../services/recipes';
import { IonicPage, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { Component } from "@angular/core";

@IonicPage()
@Component({
    selector: "page-edit-recipe", 
    templateUrl: "edit-recipe.html"
})
export class EditRecipePage{


    ingredients: string[] = [];  

    constructor(public actionSheetCtrl: ActionSheetController, 
                public alertCtrl: AlertController, 
                public toastCtrl: ToastController, 
                private recipesService: RecipesService){}

    onManageIngredient(){
        const actionSheet = this.actionSheetCtrl.create({
            title: "What do you want to do?", 
            buttons:[{
                text: "Add ingredient", 
                handler: ()=>{
                    this.addIngredient(); 
                }
            }, 
            {
                text: "Remove all Ingredients", 
                role:"destructive", 
                handler: ()=>{
                    this.ingredients = []; 
                    this.presentToast("Ingredients deleted"); 
                }
            }, 
            {
                text: "Cancel", 
                role:"cancel", 
                handler: ()=>{
                    console.log("cancel"); 
                }
            }
            ]
        }); 
        actionSheet.present(); 
    }

    onAddRecipe(){
        let recipe:Recipe = {
            title: "title", 
            description: "", 
            difficulty: "", 
            ingredients:[]
        }
        this.recipesService.addRecipe(recipe); 
        this.presentToast("Recipe added!"); 
    }

    addIngredient(){
        const prompt = this.alertCtrl.create({
            title: "Add Ingredient", 
            inputs: [
                {
                    name: "name", 
                    placeholder: "name"
                }
            ], 
            buttons: [ {
                text: "Add", 
                handler: (data: string)=>{
                    console.log("add"); 
                    this.ingredients.push(data["name"]); 
                    this.presentToast("Ingredient added"); 
                }
            }, 
            {
                text: "Cancel", 
                role: "cancel", 
                handler: ()=>{
                    console.log("cancel"); 
                }
            }]
        }); 

        prompt.present(); 
    }

    presentToast(text: string){
        const toast = this.toastCtrl.create({
            message: text, 
            duration: 3000
        }); 
        toast.present(); 
    }
}
import { Ingredient } from './../../models/ingredient';
import { RecipesService } from './../../services/recipes';
import { IonicPage, ActionSheetController, AlertController, ToastController, NavParams, NavController } from 'ionic-angular';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Recipe } from '../../models/recipe';

@IonicPage()
@Component({
    selector: "page-edit-recipe", 
    templateUrl: "edit-recipe.html"
})
export class EditRecipePage implements OnInit{

    mode:string = "New"; 
    selectOptions: string[] = ["Easy", "Medium", "Hard"]; 
    recipeForm: FormGroup; 

    constructor(private navParams: NavParams, 
                private navCtrl: NavController, 
                private actionSheetCtrl: ActionSheetController, 
                private alertCtrl: AlertController, 
                private toastCtrl: ToastController, 
                private recipesService: RecipesService){}

    ngOnInit(){
        this.mode = this.navParams.get("mode"); 
        this.initializeForm(); 
    }

    private initializeForm(){
        this.recipeForm = new FormGroup({
            title: new FormControl(null, Validators.required), 
            description: new FormControl(null, Validators.required), 
            difficulty: new FormControl('Medium', Validators.required), 
            ingredients: new FormArray([])
        })
    }

    //https://angular.io/guide/reactive-forms
    //A getter provides easy access to the aliases in the form array instance compared to repeating the recipeForm.get() method to get each instance. 
    //The form array instance represents an undefined number of controls in an array. It's convenient to access a control through a getter, 
    //and this approach is easy to repeat for additional controls.
    get ingredients() {
        return this.recipeForm.get('ingredients') as FormArray;
    }

    onSubmit(){
        console.log(this.recipeForm); 
        const value = this.recipeForm.value; 
        let ingredients: Ingredient[] = []; 
        if(value.ingredients.length > 0){
            ingredients = value.ingredients.map(name=> {
                return new Ingredient(name, 1); 
            })
        }
        this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients); 
        this.recipeForm.reset(); 
        this.navCtrl.popToRoot(); 
        this.presentToast("Recipe added!"); 
    }

    onManageIngredient(){
        const actionSheet = this.actionSheetCtrl.create({
            title: "What do you want to do?", 
            buttons:[{
                text: "Add ingredient", 
                handler: ()=>{
                    this.createNewIngredientAlert().present(); 
                }
            }, 
            {
                text: "Remove all Ingredients", 
                role: "destructive", 
                handler: ()=>{
                    const len = this.ingredients.length; 
                    if(len>0){
                        for (let i = len-1; i >=0; i--) {
                            this.ingredients.removeAt(i); 
                        }
                    }
                    this.presentToast("Ingredients deleted"); 
                }
            }, 
            {
                text: "Cancel", 
                role: "cancel"
            }
            ]
        }); 
        actionSheet.present(); 
    }

    

    createNewIngredientAlert(){
        return this.alertCtrl.create({
            title: "Add Ingredient", 
            inputs: [
                {
                    name: "name", 
                    placeholder: "Name"
                }
            ], 
            buttons: [ {
                text: "Add", 
                handler: data =>{
                    console.log("add"); 
                    if(data.name.trim() == "" || data.name == null){
                        this.presentToast('Please enter a valid value!'); 
                        return; 
                    } else {
                        this.ingredients.push(new FormControl(data.name, Validators.required)); 
                        this.presentToast("Ingredient added"); 
                    }
                    
                }
            }, 
            {
                text: "Cancel", 
                role: "cancel"
            }]
        }); 
    }

    presentToast(text: string){
        const toast = this.toastCtrl.create({
            message: text, 
            duration: 1500, 
            position: "bottom"
        }); 
        toast.present(); 
    }
}
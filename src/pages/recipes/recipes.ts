import { Recipe } from './../../data/recipe.interface';
import { RecipesService } from './../../services/recipes';
import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@IonicPage()
@Component({
    selector: "page-recipes", 
    templateUrl: "recipes.html"
})
export class RecipesPage {

    recipes: Recipe[] = []; 

    constructor(private navCtrl: NavController, 
                private recipesService: RecipesService){}

    ionViewWillEnter(){
     this.recipes = this.recipesService.getRecipes(); 
    }

    onAddRecipe(){
        this.navCtrl.push("EditRecipePage"); 
    }

    onGoToRecipe(recipe: Recipe){
        this.navCtrl.push("RecipePage", recipe)
    }
}
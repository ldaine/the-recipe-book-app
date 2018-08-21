import { Recipe } from './../../models/recipe';
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
        this.navCtrl.push("EditRecipePage", {mode: "New"}); 
    }

    onGoToRecipe(recipe: Recipe, index: number){
        this.navCtrl.push("RecipePage", {recipe: recipe, index: index}); 
    }
}
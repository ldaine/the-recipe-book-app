import { Recipe } from './../data/recipe.interface';
import { Injectable } from "@angular/core";

@Injectable()
export class RecipesService{
    private recipes: Recipe[] = []; 

    getRecipes(){
        return this.recipes; 
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe); 
    }
}
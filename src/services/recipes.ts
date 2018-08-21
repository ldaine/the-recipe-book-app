import { Ingredient } from './../models/ingredient';
import { Recipe } from './../models/recipe';
import { Injectable } from "@angular/core";

@Injectable()
export class RecipesService{
    private recipes: Recipe[] = []; 

    getRecipes(){
        return this.recipes.slice(); 
    }

    addRecipe(title:string, description:string, difficulty:string, ingredients:Ingredient[] = []){
        this.recipes.push(new Recipe(title, description, difficulty, ingredients)); 
    }

    updateRecipe(index: number, title:string, description:string, difficulty:string, ingredients:Ingredient[] = []){
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients); 
    }

    removeRecipe(index: number){
        this.recipes.splice(index, 1); 
        console.log(this.recipes); 
    }
}
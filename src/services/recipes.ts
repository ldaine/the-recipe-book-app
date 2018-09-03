import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth';
import { Ingredient } from './../models/ingredient';
import { Recipe } from './../models/recipe';
import { Injectable } from "@angular/core";

@Injectable()
export class RecipesService{
    private recipes: Recipe[] = []; 

    constructor(private authService: AuthService, 
                private http: HttpClient){}

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

    storeList(token:string){
        const userId = this.authService.getActiveUser().uid; 

        return this.http
            .put(`https://the-recipe-book-59041.firebaseio.com/${userId}/recipes.json?auth=${token}`, this.recipes); 
    }

    fetchList(token:string){
        const userId = this.authService.getActiveUser().uid; 

        return this.http
            .get(`https://the-recipe-book-59041.firebaseio.com/${userId}/recipes.json?auth=${token}`)
            .do((data:Recipe[])=>{
                console.log(data); 
                this.recipes = data || []; 
                for (const recipe of this.recipes) {
                    if(recipe.ingredients == null){
                        recipe.ingredients = []; 
                    }
                }
            }); 
    }

}
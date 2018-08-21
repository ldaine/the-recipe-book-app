import { RecipesService } from './../../services/recipes';
import { Recipe } from './../../models/recipe';
import { OnInit } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list';


@IonicPage()
@Component({
    selector: "page-recipe", 
    templateUrl: "recipe.html"
})

export class RecipePage implements OnInit{

    recipe: Recipe; 
    index: number; 

    constructor(public navParams: NavParams, 
                public navCtrl: NavController, 
                private shoppingListService: ShoppingListService, 
                private recipesService: RecipesService){

    }

    ngOnInit(){
        this.recipe = this.navParams.get("recipe"); 
        this.index = this.navParams.get("index"); 
    }

    //isn video onAddIngredients()
    onSendToShoppingList(){
        this.shoppingListService.addItems(this.recipe.ingredients); 
    }

    onEditRecipe(){
        this.navCtrl.push("EditRecipePage", {mode: "Edit", recipe: this.recipe, index: this.index}); 
    }

    onDeleteRecipe(){
        this.recipesService.removeRecipe(this.index); 
        this.navCtrl.pop(); 
    }
}
import { AuthService } from './auth';
import { Ingredient } from './../models/ingredient';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx'; 

@Injectable()
export  class ShoppingListService {
    private ingredients: Ingredient[] = []; 

    constructor(private http: HttpClient, 
                private authService: AuthService){}

    getItems():Ingredient[]{
        return this.ingredients.slice(); 
    }

    addItem(name: string, amount: number){
        this.ingredients.push(new Ingredient(name, amount)); 
        console.log(this.ingredients); 
    }

    addItems(items: Ingredient[]){
        this.ingredients.push(...items); 
    }

    removeItem(index:number){
        this.ingredients.splice(index, 1); 
    }

    storeList(token:string){
        const userId = this.authService.getActiveUser().uid; 

        return this.http
            .put(`https://the-recipe-book-59041.firebaseio.com/${userId}/shopping-list.json?auth=${token}`, this.ingredients); 
    }

    fetchList(token:string){
        const userId = this.authService.getActiveUser().uid; 

        return this.http
            .get(`https://the-recipe-book-59041.firebaseio.com/${userId}/shopping-list.json?auth=${token}`)
            .do((data:Ingredient[])=>{
                console.log(data); 
                this.ingredients = data; 
            }); 
    }
}
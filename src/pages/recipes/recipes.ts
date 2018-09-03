import { Recipe } from './../../models/recipe';
import { RecipesService } from './../../services/recipes';
import { IonicPage, NavController, AlertController, LoadingController, PopoverController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
    selector: "page-recipes", 
    templateUrl: "recipes.html"
})
export class RecipesPage {

    recipes: Recipe[] = []; 

    constructor(private navCtrl: NavController, 
                private recipesService: RecipesService, 
                private popoverCtrl: PopoverController, 
                private alertCtrl: AlertController, 
                private loadingCtrl: LoadingController, 
                private authService: AuthService){}

    ionViewWillEnter(){
     this.recipes = this.recipesService.getRecipes(); 
    }

    onAddRecipe(){
        this.navCtrl.push("EditRecipePage", {mode: "New"}); 
    }

    onGoToRecipe(recipe: Recipe, index: number){
        this.navCtrl.push("RecipePage", {recipe: recipe, index: index}); 
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
                            this.recipesService.fetchList(token)
                            .subscribe(
                                (list:Recipe[])=>{
                                    loading.dismiss(); 
                                    console.log('success',data); 
                                    if(list){
                                        this.recipes = list; 
                                    } else {
                                        this.recipes = []; 
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
                            this.recipesService.storeList(token)
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

    private handleError(errorMessage: string){
        const alert = this.alertCtrl.create({
            title: "An error occured!", 
            message: errorMessage, 
            buttons:['Ok']
        }); 
        alert.present(); 
    }

}
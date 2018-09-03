import { IonicPage, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

@IonicPage()
@Component({
    selector: 'page-database-options', 
    templateUrl: 'database-options.html'
})
export class DatabaseOptionsPage {

    constructor(private viewCtrl: ViewController){}

    onAction(action: string){
        this.viewCtrl.dismiss({action: action})
    }
}
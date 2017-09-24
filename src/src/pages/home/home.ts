import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//var optional = require("./optional");
import * as optional from 'optional';
 
const electron = optional("electron");

//declare const electron
//declare const path

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
    
    console.log(electron);
    if(electron) {
       console.log('Electron is now available: ', electron);
    //   console.log('Electron remote is now available: ', electron.remote);
    //   console.log('Path is now available: ', path);
    }
  }

}

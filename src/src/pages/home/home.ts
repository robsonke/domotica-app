import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//var optional = require("./optional");
import * as optional from 'optional';
 
const electron = optional("electron");

//declare const electron

/**
 * Default dashboard view
 * 
 * @param  {'page-home'}  {selector   [description]
 * @param  {'home.html'}} templateUrl [description]
 * @return {[type]}                   [description]
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
    if(electron) {
      console.log('Electron is now available: ', electron);
      console.log('Electron remote is now available: ', electron.remote);
    }
  }

}

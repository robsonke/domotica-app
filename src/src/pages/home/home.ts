import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DomoticzMqttService } from '../../services/domoticz-mqtt.service'
import { DomoticzService } from '../../services/domoticz-service';
import { Observable } from 'rxjs/Observable';

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
  templateUrl: 'home.html',
  providers: [ DomoticzMqttService, DomoticzService ]
})
export class HomePage implements OnInit {

  public data: Observable<Array<any>>;

  constructor(public navCtrl: NavController, private domoticzMqttService: DomoticzMqttService) {

    if(electron) {
      console.log('Electron is now available: ', electron);
      console.log('Electron remote is now available: ', electron.remote);
    }
  }

  ngOnInit() {
    this.data = this.domoticzMqttService.subscribeToMqttService();
  }
}

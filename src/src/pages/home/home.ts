import { DomoticzService } from './../../services/domoticz-service';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { DomoticzMqttService } from '../../services/domoticz-mqtt.service'
import { Observable, Subscription } from 'rxjs/RX';

import * as optional from 'optional';


const electron = optional("electron");
//declare const electron

/**
 * Default dashboard view
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ DomoticzMqttService, DomoticzService ]
})
export class HomePage implements OnInit {

  public data: Observable<Array<any>>;
  private onResumeSubscription: Subscription;


  constructor(public navCtrl: NavController, private platform: Platform, private domoticzMqttService: DomoticzMqttService) {

    if(electron) {
      console.log('Electron is now available: ', electron);
      console.log('Electron remote is now available: ', electron.remote);
    }

    this.onResumeSubscription = platform.resume.subscribe(() => {
      // when you reopen the paused app, fetch the latest data
      this.domoticzMqttService.refreshInitialData();
    });
  }

  refreshDevices(): void {
    this.domoticzMqttService.refreshInitialData();
  }

  ngOnInit() {
    this.data = this.domoticzMqttService.subscribeToMqttService();
  }

  ngOnDestroy() {
    this.onResumeSubscription.unsubscribe();
  }
}

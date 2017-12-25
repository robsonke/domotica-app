import { DomoticzService } from './../../services/domoticz-service';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { DomoticzMqttService } from '../../services/domoticz-mqtt.service'
import { Observable, Subscription } from 'rxjs/RX';

@Component({
  selector: 'page-light',
  templateUrl: 'light.html',
  providers: [ DomoticzMqttService, DomoticzService ]
})
export class LightPage {
  public data: Observable<Array<any>>;
  private onResumeSubscription: Subscription;


  constructor(public navCtrl: NavController, private platform: Platform, private domoticzMqttService: DomoticzMqttService) {
    this.onResumeSubscription = platform.resume.subscribe(() => {
      // when you reopen the paused app, fetch the latest data
      this.domoticzMqttService.refreshInitialData();
    });
  }

  refreshDevices($event?: any): void {
    if($event)
      this.domoticzMqttService.refreshInitialData($event.complete.bind($event));
    else this.domoticzMqttService.refreshInitialData();
  }

  ngOnInit() {
    this.data = this.domoticzMqttService.subscribeToMqttService();
  }

  ngOnDestroy() {
    this.onResumeSubscription.unsubscribe();
  }
}

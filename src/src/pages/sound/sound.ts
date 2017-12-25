import { Device } from './../../domain/device.domain';
import { DomoticzService } from './../../services/domoticz-service';
import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { DomoticzMqttService } from '../../services/domoticz-mqtt.service'
import { Observable, Subscription } from 'rxjs/RX';
import { AirfoilService } from '../../services/airfoil-service';
import { SpeakerComponent } from '../../components/speakers.component';

@Component({
  selector: 'page-sound',
  templateUrl: 'sound.html',
  providers: [ DomoticzMqttService, DomoticzService, AirfoilService ]
})
export class SoundPage {
  public data: Observable<Array<Device>>;
  private onResumeSubscription: Subscription;
  @ViewChild('speakers') speakers: SpeakerComponent;

  constructor(public navCtrl: NavController, private platform: Platform, private domoticzMqttService: DomoticzMqttService, private airfoilService: AirfoilService) {
    this.onResumeSubscription = platform.resume.subscribe(() => {
      // when you reopen the paused app, fetch the latest data
      this.domoticzMqttService.refreshInitialData();
    });
  }

  refreshDevices($event?: any): void {
    if($event)
      this.domoticzMqttService.refreshInitialData($event.complete.bind($event));
    else this.domoticzMqttService.refreshInitialData();
    this.speakers.refreshData();
  }

  ngOnInit() {
    this.data = this.domoticzMqttService.subscribeToMqttService();
  }

  ngOnDestroy() {
    this.onResumeSubscription.unsubscribe();
  }

}

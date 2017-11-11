import { DomoticzService } from './domoticz-service';
import { Injectable } from '@angular/core';
import { MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs/RX';
import { Device } from '../domain/device.domain';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/share';
import "rxjs/add/operator/mergeMap";



@Injectable()
export class DomoticzMqttService {
  // the behaviorsubject will hold a list of devices
  // and every subscriber will get the initial list of all devices
  // plus notifications on each updated array
  private allDevicesSubject: BehaviorSubject<Device[]> = new BehaviorSubject([]);
  // local store for the actual data
  private allDevices: Array<Device> = [];

  constructor(private mqttService: MqttService, private domoticzService: DomoticzService) {
    // populate with initial data from the rest api of the home-api
    this.refreshInitialData();

    // listen to the out topic for changes in devices, this is the enriched one by node-red
    let self = this;
    this.mqttService.observe('domoticz/out/json')
      .subscribe(
        data => {
          let oneDeviceRaw:any = JSON.parse(data.payload.toString());
          let oneDevice:Device = oneDeviceRaw.result[0];
          // replace or add the item in the array
          this.replaceCachedDevice(oneDevice);

          // clone the array as the updated original array isn't seen as a changed one by angular
          let clonedList = self.allDevices.map(x => Object.assign({}, x));

          this.allDevicesSubject.next(clonedList);
        },
        error => console.log("Error subscribing to DataService: " + error)
      );
  }

  public refreshInitialData(): void {
    this.domoticzService.getDevices().subscribe(data => {
      this.allDevices = data;
      this.allDevicesSubject.next(data.map(x => Object.assign({}, x)));
    });
  }

  private replaceCachedDevice(updatedDevice:Device) {
    let found:boolean = false;
    this.allDevices.forEach((element, index) => {
      if( element.idx == updatedDevice.idx) {
        found = true;
        this.allDevices[index] = updatedDevice;
      }
    });

    if(!found) {
      // probably this wasn't discovered earlier, add it as a new device
      this.allDevices.push(updatedDevice);
    }
  }

  public subscribeToMqttService(): Observable<Device[]> {
    return this.allDevicesSubject.asObservable();
  }
}

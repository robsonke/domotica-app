import { Injectable } from '@angular/core';
import { Device } from '../domain/device.domain';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/RX';

import { BaseService } from './base-service';


@Injectable()
export class DomoticzService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getDevice(id: number): Observable<Device> {
    return this.doGetRequest('/api/domoticz/devices/' + id);
  }

  /**
   * @param filter can be `light`, `weather`, `temperature`, `utility`
   * @param used true or false or empty but we don't use that
   * @param order any field which you'd like to order by
   */
  public getDevices(filter: string = 'all', used: boolean = true, favorite: boolean = null, order: string = 'Name'): Observable<Array<any>> {
    let params: Array<any> = [{
      filter: filter,
      used: used,
      order: order,
      type: 'devices'
    }];

    if (favorite != null) {
      params.push({ favorite: ((favorite) ? 1 : 0) });
    }
    return this.doGetRequest('/api/domoticz/devices', params);
  }

  /**
   * @param id the idx of the device
   * @param status can be On/Off/Toggle
   */
  public setLightSwitch(id: number, status: string): void {
    let params: Array<any> = [{ id: id }, { status: status }];

    this.doPutRequest('/api/domoticz/devices/lights/switches/{id}/{status}', params).subscribe();
  }

  /**
   * @param id the idx of the device
   * @param number can be between 0 and 100
   */
  public setLightLevel(id: number, level: number): void {
    let params: Array<any> = [{ id: id }, { level: level }];

    this.doPutRequest('/api/domoticz/devices/lights/dimmables/{id}/{level}', params).subscribe();
  }

  /**
   * @param id the device id
   * @param value new temperature as a float
   */
  public setTemperature(id: number, value: number): void {
    let params: Array<any> = [{ id: id }, { temperature: value }];
    this.doPutRequest('/api/domoticz/devices/temperatures/{id}/{temperature}', params).subscribe();
  }
}

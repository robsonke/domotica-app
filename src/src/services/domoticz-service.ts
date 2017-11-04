import { Injectable } from '@angular/core';
import { Device } from '../domain/device.domain';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/RX';

import { CONFIG } from './app.config';


@Injectable()
export class DomoticzService {
  
  constructor(private http: HttpClient) { }

  public getDevice(id: number): Observable<Device> {
    // return this.doRequest([{ type: 'devices' }, { rid: id }]);
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
  
  
  // /**
  //  * @param id the idx of the device
  //  * @param status can be On/Off/Toggle or in case of a dimmable it's a number between 0 and 100
  //  * @param type can be switch or dimmable
  //  */
  // public setLightSwitch(id: number, status: string, type: string): Promise<Device> {
  //   let params: Array<any> = [{ type: 'command' }, { idx: id }];
  // 
  //   type === 'switch' ? params.push({ param: 'switchlight' }) : this;
  //   type === 'dimmable' ? status = 'Set%20Level&level=' + (Number(status) / 100) * 16 : this;
  // 
  //   // ugly capitals
  //   status === 'toggle' ? status = 'Toggle' : this;
  //   status === 'on' ? status = 'On' : this;
  //   status === 'off' ? status = 'Off' : this;
  // 
  //   params.push({ switchcmd: status });
  // 
  //   return this.doRequest(params);
  // }
  // 
  // /**
  //  * @param id the device id
  //  * @param value new temperature as a float
  //  */
  // public setTemperature(id: number, value: number): Promise<Device> {
  //   let params: Array<any> = [
  //     { type: 'command' },
  //     { idx: id },
  //     { param: 'udevice' },
  //     { svalue: value },
  //     { nvalue: '0' }
  //   ];
  // 
  //   return this.doRequest(params);
  // }

  private doGetRequest(path:string, params?: Array<any>): Observable<any> {
    let url: string = 'http://' + CONFIG.home_api_address + ':' + CONFIG.home_api_port + path;
    
    //params.forEach((param) => url.addSearch(param));
    let httpParams: HttpParams = new HttpParams();
    if(params) {
      params.forEach(function(value, index) {
        httpParams.append(index.toString(), value);
      });
    }
    return this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' +  btoa(CONFIG.domoticz_user+':'+CONFIG.domoticz_password)),
      params: httpParams
    });
  }
}

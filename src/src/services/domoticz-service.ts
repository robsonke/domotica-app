import { Injectable } from '@angular/core';
import { Device } from '../domain/device.domain';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/RX';

import { CONFIG } from './app.config';


@Injectable()
export class DomoticzService {

  constructor(private http: HttpClient) { }

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

    this.doPutRequest('/api/domoticz/devices/lights/switches/{id}/{status}', params);
  }

  /**
   * @param id the device id
   * @param value new temperature as a float
   */
  public setTemperature(id: number, value: number): void {
    let params: Array<any> = [{ id: id }, { temperature: value }];
    this.doPutRequest('/api/domoticz/devices/temperatures/{id}/{temperature}', params);
  }

  private doGetRequest(path:string, params?: Array<any>): Observable<any> {
    let url: string = 'https://' + CONFIG.home_api_address + ':' + CONFIG.home_api_port + path;

    let httpParams: HttpParams = this.getQueryParams(params);
    return this.http.get(url, {
      headers: this.getAuthHeader(),
      params: httpParams
    });
  }

  private doPutRequest(path:string, pathParams?: Array<any>, queryParams?: Array<any>, body?: Array<any> | null): void {
    let url: string = 'https://' + CONFIG.home_api_address + ':' + CONFIG.home_api_port + path;

    if (pathParams != null) {
      pathParams.forEach((param, index) => {
        for (let paramKey in param)
        url = url.replace("{" + paramKey + "}", param[paramKey]);
      });
    }
    let httpParams: HttpParams = this.getQueryParams(queryParams);

    this.http.put(url, body, {
        headers: this.getAuthHeader(),
        params: httpParams,
        responseType: "text"
      }).subscribe();
  }

  private getAuthHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Basic ' +  btoa(CONFIG.home_api_user+':'+CONFIG.home_api_password));
  }

  private getQueryParams(params?: Array<any>): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    if(params) {
      params.forEach(function(value, index) {
        httpParams.append(index.toString(), value);
      });
    }
    return httpParams;
  }
}

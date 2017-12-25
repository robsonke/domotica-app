import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/RX';

import { CONFIG } from './app.config';

export abstract class BaseService {
  constructor(private http: HttpClient) { }

  protected doGetRequest(path:string, params?: Array<any>): Observable<any> {
    let url: string = 'https://' + CONFIG.home_api_address + ':' + CONFIG.home_api_port + path;

    let httpParams: HttpParams = this.getQueryParams(params);
    return this.http.get(url, {
      headers: this.getAuthHeader(),
      params: httpParams
    });
  }

  protected doPutRequest(path:string, pathParams?: Array<any>, queryParams?: Array<any>, body?: Array<any> | null): Observable<any> {
    let url: string = 'https://' + CONFIG.home_api_address + ':' + CONFIG.home_api_port + path;

    if (pathParams != null) {
      pathParams.forEach((param, index) => {
        for (let paramKey in param)
        url = url.replace("{" + paramKey + "}", param[paramKey]);
      });
    }
    let httpParams: HttpParams = this.getQueryParams(queryParams);

    return this.http.put(url, body, {
        headers: this.getAuthHeader(),
        params: httpParams,
        responseType: "text"
      });
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

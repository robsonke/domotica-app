import { VolumeStatus } from './../domain/volume-status.domain';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/RX';
import { BaseService } from './base-service';


@Injectable()
export class VolumeService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getVolumeStatus(): Observable<VolumeStatus> {
    return this.doGetRequest('/api/volume/status');
  }

  public setVolumeUp(): Observable<void> {
    return this.doPutRequest('/api/volume/louder');
  }

  public setVolumeDown(): Observable<void> {
    return this.doPutRequest('/api/volume/softer');
  }
}

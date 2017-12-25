import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/RX';

import { Speaker } from '../domain/speaker.domain';
import { DomoticzService } from './domoticz-service';
import { BaseService } from './base-service';


@Injectable()
export class AirfoilService extends BaseService {

  readonly SPEAKERS_COMPUTER: string = 'Speakers Computer';
  readonly SPEAKERS_COMPUTER_DEV_ID: number = 11;

  constructor(http: HttpClient, private domoticzService: DomoticzService) {
    super(http);
  }

  public getSpeakers(): Observable<Array<Speaker>> {
    return this.doGetRequest('/api/airfoil/speakers');
  }

  public updateSpeakerStatus(speaker: Speaker) {
    if(speaker.connected == 'true') {

      // turn them off too
      if(speaker.id == this.SPEAKERS_COMPUTER) {
        this.domoticzService.setLightSwitch(this.SPEAKERS_COMPUTER_DEV_ID, 'off');
      }

      this.doPutRequest('/api/airfoil/speakers/{id}/disconnect', [ { id: speaker.id } ]).subscribe();
      speaker.connected = 'false';
    }
    else {
      // turn them on too
      if(speaker.id == this.SPEAKERS_COMPUTER) {
        this.domoticzService.setLightSwitch(this.SPEAKERS_COMPUTER_DEV_ID, 'on');
      }
      this.doPutRequest('/api/airfoil/speakers/{id}/connect', [ { id: speaker.id } ]).subscribe();
      speaker.connected = 'true';
    }
    return speaker;
  }
}

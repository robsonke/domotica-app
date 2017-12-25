import { VolumeStatus } from './../domain/volume-status.domain';
import { Speaker } from './../domain/speaker.domain';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs/RX';
import { AirfoilService } from '../services/airfoil-service';
import { Platform } from 'ionic-angular';
import { VolumeService } from '../services/volume-service';

@Component({
  providers: [ AirfoilService, VolumeService ],
  selector: 'speakers',
  templateUrl: 'speakers.component.html'
})
export class SpeakerComponent {
  public speakers: Array<Speaker>;
  public volumeStatus: VolumeStatus;
  private onResumeSubscription: Subscription;

  constructor(private platform: Platform, private airfoilService: AirfoilService, private volumeService: VolumeService) {
    this.onResumeSubscription = platform.resume.subscribe(() => {
      // when you reopen the paused app, fetch the latest data
      this.refreshData();
    });
    // and do the same every 10 seconds as airfoil won't push updates
    Observable.interval(10000).takeWhile(() => true).subscribe(() => this.refreshData());
  }

  public refreshData() {
    this.airfoilService.getSpeakers().subscribe(result => this.speakers = result);
    this.volumeService.getVolumeStatus().subscribe(result => this.volumeStatus = result);
  }

  public updateSpeakerStatus(speaker: Speaker) {
    // (un)select a speaker
    this.airfoilService.updateSpeakerStatus(speaker);
  }

  public volumeUp(level: number) {
    this.volumeService.setVolumeUp().subscribe(() => this.refreshData());
    this.volumeStatus.level = +level + +this.volumeStatus.level;
  }

  public volumeDown(level: number) {
    this.volumeService.setVolumeDown().subscribe(() => this.refreshData());
    this.volumeStatus.level = +level + +this.volumeStatus.level;
  }
}

import { DomoticzService } from './../services/domoticz-service';
import { Device } from './../domain/device.domain';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'


@Component({
  providers: [ DomoticzService ],
  selector: 'sensor',
  templateUrl: 'sensor.component.html'
})
export class SensorComponent {
  @Input() device: Device;
  @Input() icon: string;
  @Input() ionIcon: string;
  @Input() rotateIcon: string;

  constructor(private domoticzService:DomoticzService, private sanitizer: DomSanitizer) {

  }

  public getStateClass():string {
    return "";
  }

  public getLevelStyle(): SafeStyle {
    // let level = this.device.Level;

    // let safeStyle: SafeStyle = this.sanitizer.bypassSecurityTrustStyle( `width: 0%`);
    // if(this.device.SwitchType === 'Dimmer' && (this.device.Data === 'On' || this.device.Data.startsWith('Set Level')))
    //   safeStyle = this.sanitizer.bypassSecurityTrustStyle( `width: ${level}%`);
    // else if(this.device.Data === 'On')
    //   safeStyle = this.sanitizer.bypassSecurityTrustStyle( `width: 100%`);
    // return safeStyle;
    return null;
  }
}

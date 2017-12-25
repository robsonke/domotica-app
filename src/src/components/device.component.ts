import { DomoticzService } from './../services/domoticz-service';
import { Device } from './../domain/device.domain';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'


@Component({
  providers: [ DomoticzService ],
  selector: 'device',
  templateUrl: 'device.component.html'
})
export class DeviceComponent {
  @Input() device: Device;
  @Input() icon: string;
  @Input() rotateIcon: string;

  constructor(private domoticzService:DomoticzService, private sanitizer: DomSanitizer) {

  }

  public getStateClass():string {
    // a normal non dimming switch
    if(this.device.SwitchType === "On/Off") {
      if(this.device.Data === "On")
        return "switch-on device-tile";
      return "switch-off device-tile";
    }
    if(this.device.SwitchType === "Dimmer") {
      if(this.device.Data === "On" || this.device.Data.startsWith('Set Level'))
        return "dimmer-on device-tile";
      return "dimmer-off device-tile";
    }
    return "default-state device-tile";
  }

  public isDeviceOn() {
    // weird data from domoticz, dimmers only mention the level, not the current status
    return this.device.Data === 'On' || this.device.Data.startsWith('Set Level');
  }

  public setLevel($event) {
    this.domoticzService.setLightLevel(Number(this.device.idx), $event.value);
  }

  public getLevelStyle(): SafeStyle {
    let level = this.device.Level;

    let safeStyle: SafeStyle = this.sanitizer.bypassSecurityTrustStyle( `width: 0%`);
    if(this.device.SwitchType === 'Dimmer' && (this.device.Data === 'On' || this.device.Data.startsWith('Set Level')))
      safeStyle = this.sanitizer.bypassSecurityTrustStyle( `width: ${level}%`);
    else if(this.device.Data === 'On')
      safeStyle = this.sanitizer.bypassSecurityTrustStyle( `width: 100%`);
    return safeStyle;
  }

  public changeState(): void {
    if(this.device.Data === 'On' || this.device.Data.startsWith('Set Level'))
      this.domoticzService.setLightSwitch(Number(this.device.idx), 'off');
    else if(this.device.Data === 'Off')
      this.domoticzService.setLightSwitch(Number(this.device.idx), 'on');

  }

}

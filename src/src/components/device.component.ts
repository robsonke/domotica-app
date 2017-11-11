import { DomoticzService } from './../services/domoticz-service';
import { Device } from './../domain/device.domain';
import { Component, Input } from '@angular/core';


@Component({
  providers: [ DomoticzService ],
  selector: 'device',
  templateUrl: 'device.component.html'
})
export class DeviceComponent {
  @Input() device: Device;

  constructor(private domoticzService:DomoticzService) {

  }

  public getStateClass():string {
    // a normal non dimming switch
    if(this.device.SwitchType === "On/Off") {
      if(this.device.Data === "On")
        return "switch-on";
      return "switch-off";
    }
    if(this.device.SwitchType === "Dimmer") {
      if(this.device.Data === "On")
        return "dimmer-on";
      return "dimmer-off";
    }
    return "default-state";
  }

  public changeState():void {
    if(this.device.Status === 'On') {
      this.domoticzService.setLightSwitch(Number(this.device.idx), 'off');
    }
    else if(this.device.Status === 'Off') {
      this.domoticzService.setLightSwitch(Number(this.device.idx), 'on');
    }
  }

}

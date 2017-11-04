import { Observable } from 'rxjs/RX';
import { Device } from './../domain/device.domain';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'device',
  templateUrl: 'device.component.html'
})
export class DeviceComponent {
  @Input() device: Device;
  @Input() devicesOb: Observable<Array<Device>>;
  @Input() idx: string;

  private getStateClass():string {
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

}

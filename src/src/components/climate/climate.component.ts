import { DomoticzService } from './../../services/domoticz-service';
import { Device } from './../../domain/device.domain';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'


@Component({
  providers: [ DomoticzService ],
  selector: 'climate',
  templateUrl: 'climate.component.html'
})
export class ClimateComponent {
  // the temperature setting
  @Input() nestSetTempDevice: Device;
  @Input() nestTempLivingRoomDevice: Device;
  @Input() tempHallDevice: Device;
  @Input() heatingDevice: Device;
  @Input() outsideDevice: Device;
  @Input() outsideWeatherDevice: Device;
  @Input() visibilityDevice: Device;

  @Input() icon: string;
  @Input() rotateIcon: string;

  constructor(private domoticzService:DomoticzService, private sanitizer: DomSanitizer) {

  }

  public updateNestTemperature(difference: number) {
    let newTemp: number = Number(this.nestSetTempDevice.Data) + difference;
    this.domoticzService.setTemperature(Number(this.nestSetTempDevice.idx), newTemp);
    this.nestSetTempDevice.Data = newTemp.toString();
  }
}

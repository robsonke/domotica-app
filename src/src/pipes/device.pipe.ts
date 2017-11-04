import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'deviceFilter'})
export class DevicePipe implements PipeTransform {
  transform(devices: Array<any>, idx: string): any {
    if (!devices || devices.length == 0) return "";
    let device = this.findDeviceByIdx(devices, parseInt(idx));
    return device;
  }

  private findDeviceByIdx(devices:Array<any>, idx:number): any {
    let device = devices.filter(device => {
      return device.idx == idx
    });
    if(device.length > 0)
      return device[0];
    return null;
  }
}
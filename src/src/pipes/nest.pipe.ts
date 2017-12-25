import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'nestDataFilter'})
export class NestPipe implements PipeTransform {
  transform(data: string): any {
    if (!data || data.length == 0) return "";
    return data.substring(0, data.indexOf(','));
  }
}

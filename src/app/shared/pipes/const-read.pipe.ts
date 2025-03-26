import { Pipe, PipeTransform } from '@angular/core';
import { Constant } from '../../core/constant/Constant';

@Pipe({
  name: 'constRead'
})
export class ConstReadPipe implements PipeTransform {

  transform(keyName: string): string {
    
    const validation_message =  Constant.VALIDATION_MESSAGE as any;
    return validation_message[keyName];
  }

}

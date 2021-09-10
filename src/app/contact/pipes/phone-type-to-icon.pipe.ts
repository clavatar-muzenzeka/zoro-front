import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneTypeToIcon'
})
export class PhoneTypeToIconPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    let icon = 'phone_iphone';
    switch(value){
      case 'home':
        icon='home'
        break;
        case 'work':
        icon='phone'
        break;
    }
    return icon
  }

}

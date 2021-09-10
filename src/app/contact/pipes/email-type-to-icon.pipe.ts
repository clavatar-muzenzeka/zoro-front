import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailTypeToIcon'
})
export class EmailTypeToIconPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let icon = 'email';
    switch(value){
      case 'home':
        icon='home'
        break;
        case 'work':
        icon='work'
        break;
    }
    return icon
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { countryCodes } from 'src/assets/country-codes.const';

@Pipe({
  name: 'getFlagFromCountryCode'
})
export class GetFlagFromCountryCodePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log('value ', value)
    let cc = countryCodes.find(
      cc=>cc.code == value
    )
    return cc? cc.flag: ''
  }

}

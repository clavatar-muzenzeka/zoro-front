export interface GooglePhone {
  value: string;
  countryCode: CountryCodesEnum;
  canonicalForm?: string;
  type?: GooglePhoneType;
}

export enum GooglePhoneType{
HOME='home',
WORK='work',
MOBILE='mobile',
}

export enum CountryCodesEnum{
  DRC = '+243',
  FRANCE= '+33'
}
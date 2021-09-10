export interface GoogleEmailAddress{
  "value": string,
  "type"?: GoogleEmailAddressType
}

export enum GoogleEmailAddressType{
HOME= 'home',
WORK= 'work',
OTHER= 'other',
}
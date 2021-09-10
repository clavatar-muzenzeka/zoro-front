import { GoogleEmailAddress } from "./google-email.interface";
import { GoogleName } from "./google-name.interface";
import { GoogleOrganisation } from "./google-organisation.interface";
import { GooglePhone } from "./google-phone.interface";

export interface GoogleCompliantContact{
   _id?: string;
    favorite?: boolean;
  "resourceName"?: string,
  "etag"?: string,
  "emailAddresses"?: Array<GoogleEmailAddress>,
  "names"?: Array<GoogleName>,
  "organizations"?: Array<GoogleOrganisation> ,
  "phoneNumbers"?: Array<GooglePhone>
}

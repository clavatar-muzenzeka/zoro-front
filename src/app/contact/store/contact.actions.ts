import { createAction, props } from "@ngrx/store";
import { GoogleCompliantContact } from "../model/google-contact.interface";
import { PaginationParams } from "../model/pagination-params.interface";

export const requestContactSave = createAction(
  "[contact] request contact save"
);

export const saveContact = createAction(
  "[contact] save contact",
  props<GoogleCompliantContact>()
);

export const contactSaved = createAction(
  "[contact] contact saved",
  props<GoogleCompliantContact>()
);

export const loadContacts = createAction(
  "[contact] load contacts",
  props<PaginationParams>()
);

export const contactsLoaded = createAction(
  "[contact] contacts loaded",
  props<{ contacts: Array<GoogleCompliantContact> }>()
);

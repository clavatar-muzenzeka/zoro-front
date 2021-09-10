import { state } from "@angular/animations";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeature, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { UserService } from "src/app/user/services/user.service";
import { GoogleCompliantContact } from "../model/google-contact.interface";
import { contactSaved, contactsLoaded } from "./contact.actions";

export const contactFeatureKey = "contact";

export interface ContactState extends EntityState<GoogleCompliantContact> {
  selectedContactId: string | number | null;
}

export function selectContactId(contact: GoogleCompliantContact): string {
  //In this case this would be optional since primary key is id
  return contact._id;
}

export const contactAdapter: EntityAdapter<GoogleCompliantContact> =
  createEntityAdapter<GoogleCompliantContact>({
    selectId: selectContactId,
  });

  export const selectContactState = createFeatureSelector<ContactState>(contactFeatureKey)

export const userInitialState: ContactState = contactAdapter.getInitialState({
  selectedContactId: null,
});

export const contactReducer = createReducer(
  userInitialState,
  on(contactSaved, (state, contact) => contactAdapter.addOne(contact, state)),
  on(contactsLoaded, (state, action) => contactAdapter.addMany(action.contacts, state))
);

export const selectAllUser = createSelector(
 selectContactState,
  contactAdapter.getSelectors().selectAll
)

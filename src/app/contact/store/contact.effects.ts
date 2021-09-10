import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createAction } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";
import { ContactService } from "../services/contact.service";
import { saveContact, contactSaved, contactsLoaded, loadContacts } from "./contact.actions";

@Injectable()
export class ContactEffects {
  constructor(
    private _actions$: Actions,
    private _contactService: ContactService
  ) {}

  saveContact$ = createEffect(() =>
    this._actions$.pipe(
      ofType(saveContact),
      switchMap((contact) => {
        return this._contactService
          .saveContact(contact)
          .pipe(map((savedContact) => contactSaved(savedContact)));
      })
    )
  );

  loadContacts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadContacts),
      switchMap((action) => 
        this._contactService
          .loadContacts(action)
          .pipe(map((loadedContacts) => contactsLoaded({contacts: loadedContacts})))
      )
    )
  );
}

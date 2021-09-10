import { I18nPluralPipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormArray,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { countryCodes } from "src/assets/country-codes.const";
import { GoogleEmailAddressType } from "../model/google-email.interface";
import { GooglePhoneType } from "../model/google-phone.interface";
import { requestContactSave, saveContact } from "../store/contact.actions";
import { ContactState } from "../store/contact.reducer";

@Component({
  selector: "app-contact-details",
  templateUrl: "./contact-details.component.html",
  styleUrls: ["./contact-details.component.scss"],
})
export class ContactDetailsComponent implements OnInit {
  readonly COUNTRY_CODES = countryCodes;

  contactForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<ContactState>,
    private _actions$: Actions,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.contactForm = this._initializeForm(this._fb);
    this._actions$.pipe(ofType(requestContactSave)).subscribe((a) => {
      if (this.contactForm.invalid) return this._snackbar.open("Formulaire invalide", "OK", {duration: 2*1000, horizontalPosition:'end'});
      this._store.dispatch(saveContact(this.contactForm.value))
    });
  }

  private _initializeForm(fb: FormBuilder) {
    return fb.group({
      // names
      names: fb.array([
        fb.group({
          familyName: fb.control(""),
          givenName: fb.control(""),
          middleName: fb.control(""),
        }),
      ]),
      // phones
      phoneNumbers: fb.array([this._createPhoneEntry(GooglePhoneType.MOBILE)]),

      // emails
      emailAddresses: fb.array([
        this._createEmailEntry(GoogleEmailAddressType.WORK),
      ]),

      // organizations
      organizations: fb.array([
        fb.group({
          name: fb.control(""),
          department: fb.control(""),
          title: fb.control(""),
          location: fb.control(""),
        }),
      ]),
    });
  }

  private _createPhoneEntry(contactType: GooglePhoneType): FormGroup {
    return new FormGroup({
      countryCode: new FormControl("+243"),
      value: new FormControl(""),
      type: new FormControl(contactType),
    });
  }

  private _createEmailEntry(emailType: GoogleEmailAddressType): FormGroup {
    return new FormGroup({
      value: new FormControl(""),
      type: new FormControl(emailType),
    });
  }

  pushNewPhoneNumber(phoneType: GooglePhoneType) {
    let npe = this._createPhoneEntry(phoneType);
    npe.setParent(<FormArray>this.contactForm.get('phoneNumbers'))
    this.phoneNumbersControlsList.push(npe);
  }

  pushNewEmail(emailType: GoogleEmailAddressType) {
    let nee = this._createEmailEntry(emailType);
    nee.setParent(<FormArray>this.contactForm.get("emailAddresses"));
    this.emailAddressesControlsList.push(nee);
  }

  get GooglePhoneType() {
    return GooglePhoneType;
  }

  get GoogleEmailAddressType() {
    return GoogleEmailAddressType;
  }

  get phoneControlsList() {
    return (<FormArray>this.contactForm.controls['phoneNumbers']).controls;
  }

  get namesControlsList() {
    return (<FormArray>this.contactForm.get("names")).controls;
  }

  get organizationsControlsList() {
    return (<FormArray>this.contactForm.get("organizations")).controls;
  }

  get phoneNumbersControlsList() {
    return (<FormArray>this.contactForm.get("phoneNumbers")).controls;
  }

  get emailAddressesControlsList() {
    return (<FormArray>this.contactForm.get("emailAddresses")).controls;
  }

  get givenNameRequiredError(): boolean {
    return this.namesControlsList[0].get("givenName").hasError("required");
  }

  get organizationNameRequiredError(): boolean {
    return this.organizationsControlsList[0].get("name").hasError("required");
  }

  get titleRequiredError(): boolean {
    return this.organizationsControlsList[0].get("title").hasError("required");
  }

  get locationRequiredError(): boolean {
    return this.organizationsControlsList[0]
      .get("location")
      .hasError("required");
  }

  removePhoneFieldAt(index: number) {
    (<FormArray>this.contactForm.get("phoneNumbers")).removeAt(index);
  }

  get emailControlsList() {
    return (<FormArray>this.contactForm.get("emailAddresses")).controls;
  }

  removeEmailFieldAt(index: number) {
    (<FormArray>this.contactForm.get("emailAddresses")).removeAt(index);
  }
}

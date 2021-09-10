import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { contactSaved, loadContacts, requestContactSave } from "./store/contact.actions";
import { contactAdapter, ContactState, selectAllUser } from "./store/contact.reducer";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit, AfterViewInit {
  readonly WIDTH_PROPRTY_NAME = "--container-width";

  scrollable = true;
  contacts$ = this._store.select(selectAllUser);

  @ViewChild("contactsWrapper", { static: true }) contactsWrapper: ElementRef;
  @ViewChild("drawer", { static: true }) drawer: MatDrawer;
  constructor(
    private _store: Store<ContactState>,
    private _actions$: Actions
  ) {}
  ngAfterViewInit(): void {
    let widthValue = "100vw";
    (<HTMLElement>this.contactsWrapper.nativeElement).style.setProperty(
      this.WIDTH_PROPRTY_NAME,
      widthValue
    );
    this.drawer.openedStart.subscribe(() => {
      this._adaptMainContentWidth("67vw");
      this._disableMainContentScroll();
    });
    this.drawer.closedStart.subscribe(() => {
      this._adaptMainContentWidth("100vw");
      this._enableMainContentScroll();
    });
  }

  _adaptMainContentWidth(widthValue) {
    if (this.contactsWrapper) {
      (<HTMLElement>this.contactsWrapper.nativeElement).style.setProperty(
        this.WIDTH_PROPRTY_NAME,
        widthValue
      );
    }
  }

  requestContactSave() {
    this._store.dispatch(requestContactSave());
  }

  get containerWidth() {
    let val = (<HTMLElement>(
      this.contactsWrapper.nativeElement
    )).style.getPropertyValue(this.WIDTH_PROPRTY_NAME);
    return val;
  }

  _disableMainContentScroll() {
    this.scrollable = false;
  }

  _enableMainContentScroll() {
    this.scrollable = true;
  }

  ngOnInit(): void {
    this.contacts$.subscribe(
      u=>console.log(u)
    );
    this._store.dispatch(loadContacts({ skip: 0, limit: 10 }));
    this._actions$
      .pipe(ofType(contactSaved))
      .subscribe((action) => this.closeDrawer());
  }

  closeDrawer() {
    this.drawer.close();
  }

  openDrawer(e: Event) {
    this.drawer.open();
    e.stopPropagation();
  }
}

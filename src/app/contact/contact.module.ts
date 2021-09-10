import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactComponent } from "./contact.component";
import { ContactDetailsComponent } from "./contact-details/contact-details.component";
import { SharedModule } from "../shared/shared.module";
import { ContactRoutingModule } from "./contact-routing.module";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { PhoneTypeToIconPipe } from "./pipes/phone-type-to-icon.pipe";
import { EmailTypeToIconPipe } from "./pipes/email-type-to-icon.pipe";
import { GetFlagFromCountryCodePipe } from "./pipes/get-flag-from-country-code.pipe";
import { StoreModule } from "@ngrx/store";
import { contactFeatureKey, contactReducer } from "./store/contact.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ContactEffects } from "./store/contact.effects";
import { ContactService } from "./services/contact.service";

@NgModule({
  declarations: [
    ContactComponent,
    ContactDetailsComponent,
    PhoneTypeToIconPipe,
    EmailTypeToIconPipe,
    GetFlagFromCountryCodePipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContactRoutingModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatCardModule,
    StoreModule.forFeature(contactFeatureKey, contactReducer),
    EffectsModule.forFeature([ContactEffects]),
  ],
  providers: [ContactEffects, ContactService],
})
export class ContactModule {}

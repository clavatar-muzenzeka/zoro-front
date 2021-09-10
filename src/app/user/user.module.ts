import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SharedModule } from "../shared/shared.module";
import { UserService } from "./services/user.service";
import { EffectsModule } from "@ngrx/effects";
import { UserEffects } from "./store/user.effets";
import { StoreModule } from "@ngrx/store";
import { userFeatureKey, userReducer } from "./store/user.reducer";
import { SignInComponent } from "./signin/sign-in.component";

@NgModule({
  declarations: [SignUpComponent, SignInComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature(userFeatureKey, userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [UserService, UserEffects],
})
export class UserModule {}

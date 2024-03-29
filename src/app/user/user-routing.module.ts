import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignInComponent } from "./signin/sign-in.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: SignInComponent,
  },
  {
    path: "sign-up",
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserModule } from "./user/user.module";

const routes: Routes = [
  { path: "", pathMatch: "full", loadChildren: () => UserModule },
  {
    path: "contact",
    loadChildren: ()=>import("./contact/contact.module").then(
      (m) => m.ContactModule
    ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

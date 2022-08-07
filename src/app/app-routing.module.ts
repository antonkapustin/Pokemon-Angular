import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanActivateGuard } from "./guards/can-activate.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  {
    path: "main",
    canActivate: [CanActivateGuard],
    loadChildren: () => import("./main/main.module").then((m) => m.MainModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login-page/login-page.module").then((m) => m.LoginPageModule),
  },
  {
    path: "signUp",
    loadChildren: () =>
      import("./sign-up-page/sign-up-page.module").then(
        (m) => m.SignUpPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

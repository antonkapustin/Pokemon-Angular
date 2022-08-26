import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginPageRoutingModule } from "./login-page-routing.module";
import { LoginPageComponent } from "./login-page.component";
import { InputModule } from "../share/input/input.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AlertComponent } from "./components/alert/alert.component";

@NgModule({
  declarations: [LoginPageComponent, AlertComponent],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    InputModule,
    ReactiveFormsModule,
  ],
})
export class LoginPageModule {}

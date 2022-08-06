import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginPageRoutingModule } from "./login-page-routing.module";
import { LoginPageComponent } from "./login-page.component";
import { InputModule } from "../share/input/input.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    InputModule,
    ReactiveFormsModule,
  ],
})
export class LoginPageModule {}

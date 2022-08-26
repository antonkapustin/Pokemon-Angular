import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SignUpPageRoutingModule } from "./sign-up-page-routing.module";
import { SignUpPageComponent } from "./sign-up-page.component";
import { InputModule } from "../share/input/input.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [SignUpPageComponent],
  imports: [
    CommonModule,
    SignUpPageRoutingModule,
    InputModule,
    ReactiveFormsModule,
  ],
})
export class SignUpPageModule {}

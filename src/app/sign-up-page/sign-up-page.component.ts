import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/authorization/auth.service";

@Component({
  selector: "app-sign-up-page",
  templateUrl: "./sign-up-page.component.html",
  styleUrls: ["./sign-up-page.component.scss"],
})
export class SignUpPageComponent {
  signUpForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/
      ),
    ]),
    terms: new FormControl("", [Validators.required, Validators.requiredTrue]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    let data = this.signUpForm.value;
    this.authService.setToken(JSON.stringify(data));
    this.router.navigate(["main"]);
  }
}

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/authorization/auth.service";

export interface user {
  name: string;
  email: string;
  password: string;
  term: boolean;
}

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  alert = false;
  text = "";
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/
      ),
    ]),
  });
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["main"]);
    }
  }

  onAlert() {
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 1000);
  }
  onSubmit() {
    let data = this.loginForm.value;
    let user = {} as user;
    let value = this.authService.getToken();
    if (value) {
      user = JSON.parse(value);
    } else {
      this.onAlert();
      this.text = "you dont have account";
    }

    if (user.email != data.email) {
      this.text = "You dont have accout or wrong email";
      this.onAlert();
    } else if (user.password != data.password) {
      this.text = "Password is wrong";
      this.onAlert();
    } else {
      this.router.navigate(["main"]);
    }
  }
}

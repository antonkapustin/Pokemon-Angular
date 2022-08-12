import { Injectable } from "@angular/core";

export interface trainer {
  name: string;
  gender: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  setToken(token: string): void {
    localStorage.setItem("auth", token);
  }

  getToken(): trainer {
    let token = localStorage.getItem("auth");
    if (token) {
      return JSON.parse(token);
    } else {
      return { name: "", gender: "", email: "", password: "" };
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("auth") !== null;
  }
}

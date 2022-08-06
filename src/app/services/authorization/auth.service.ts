import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router) {}

  setToken(token: string): void {
    localStorage.setItem("key", token);
  }

  getToken(): string | null {
    return localStorage.getItem("key");
  }

  isLoggedIn(): boolean {
    return this.getToken !== null;
  }
}

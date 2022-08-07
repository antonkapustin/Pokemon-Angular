import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  setToken(token: string): void {
    localStorage.setItem("auth", token);
  }

  getToken(): string | null {
    return localStorage.getItem("auth");
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}

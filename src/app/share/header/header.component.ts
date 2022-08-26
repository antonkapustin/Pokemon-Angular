import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, debounceTime, distinctUntilChanged, of } from "rxjs";
import { HttpService, Pokemon } from "src/app/services/http/http.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isOpen = false;
  sortedPokemons$: BehaviorSubject<Pokemon[]> =
    this.httpService.getSortedPokemons();
  search!: string;
  constructor(private httpService: HttpService, private router: Router) {}
  searchChange(value: string) {
    if (value) {
      this.isOpen = true;
      this.httpService.searchPokemon(value);
    } else {
      this.isOpen = false;
    }
  }
  onLogOut() {
    localStorage.removeItem("auth");
    this.router.navigate(["/login"]);
  }
}

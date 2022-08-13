import { Component, OnInit } from "@angular/core";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
} from "rxjs";
import { HttpService, Pokemon } from "src/app/services/http/http.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  pokemons$!: Observable<Pokemon[]>;
  private searchTerm = new BehaviorSubject<string>("");
  constructor(private httpService: HttpService) {}

  search(term: string): void {
    this.searchTerm.next(term);
  }
  ngOnInit(): void {
    this.pokemons$ = this.searchTerm.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.httpService.searchPokemon(term);
      })
    );
  }
}
